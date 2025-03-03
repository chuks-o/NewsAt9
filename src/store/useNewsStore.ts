import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Article, SearchFilters, UserPreferences } from '../types';
import { fetchAllNews, fetchAvailableCategories } from '../services/api';
import { initialSearchFilters, initialSources } from '../services/constants';

interface NewsState {
  articles: Article[];
  filteredArticles: Article[];
  isLoading: boolean;
  error: string | null;
  searchFilters: SearchFilters;
  userPreferences: UserPreferences;

  fetchArticles: () => Promise<void>;
  updateSearchFilters: (filters: Partial<SearchFilters>) => void;
  toggleSource: (sourceId: string) => void;
  toggleCategory: (categoryId: string) => void;
  resetFilters: () => void;
  fetchCategories: () => Promise<void>;
  updateCategoriesFromArticles: (articles: Article[]) => void;
  filterArticlesLocally: (filters: SearchFilters, articles?: Article[]) => Article[];
}

export const useNewsStore = create<NewsState>()(
  persist(
    (set, get) => ({
      articles: [],
      filteredArticles: [],
      isLoading: false,
      error: null,
      searchFilters: initialSearchFilters,
      userPreferences: {
        sources: initialSources,
        categories: [],
        authors: [],
      },

      updateCategoriesFromArticles: (articles: Article[]) => {
        const { userPreferences } = get();

        const articleCategories = [...new Set(articles.map(article => article.category))]
          .filter(category => category)
          .sort();

        const existingCategoriesMap = new Map(
          userPreferences.categories.map(category => [category.id, category])
        );

        const updatedCategories = articleCategories.map(categoryId => {
          const existingCategory = existingCategoriesMap.get(categoryId);

          if (existingCategory) {
            return existingCategory;
          } else {
            return {
              id: categoryId,
              name: categoryId.charAt(0).toUpperCase() + categoryId.slice(1),
              enabled: true
            };
          }
        });

        set(state => ({
          userPreferences: {
            ...state.userPreferences,
            categories: updatedCategories
          }
        }));
      },

      fetchCategories: async () => {
        try {
          const categories = await fetchAvailableCategories();

          const categoryObjects = categories.map(category => ({
            id: category,
            name: category.charAt(0).toUpperCase() + category.slice(1),
            enabled: true
          }));

          set(state => ({
            userPreferences: {
              ...state.userPreferences,
              categories: categoryObjects
            }
          }));
        } catch (error) {
          console.error('Failed to fetch categories:', error);
        }
      },

      fetchArticles: async () => {
        set({ isLoading: true, error: null });
        try {
          const { searchFilters, userPreferences } = get();

          const enabledSources = userPreferences.sources
            .filter(source => source.enabled)
            .map(source => source.id);

          const enabledCategories = userPreferences.categories
            .filter(category => category.enabled)
            .map(category => category.id);

          const articles = await fetchAllNews(
            searchFilters.keyword,
            searchFilters.category,
            searchFilters.dateFrom,
            searchFilters.dateTo,
            enabledSources
          );

          get().updateCategoriesFromArticles(articles);

          let filteredArticles = get().filterArticlesLocally(searchFilters, articles)

          if (enabledSources.length > 0) {
            filteredArticles = filteredArticles.filter(
              article => enabledSources.includes(article.source.id)
            );
          }

          if (enabledCategories.length > 0 && enabledCategories.length < userPreferences.categories.length) {
            filteredArticles = filteredArticles.filter(
              article => enabledCategories.includes(article.category)
            );
          }

          set({
            articles,
            filteredArticles,
            isLoading: false
          });
        } catch (error) {
          set({
            error: 'Failed to fetch articles. Please try again later.' + error,
            isLoading: false
          });
        }
      },

      filterArticlesLocally: (filters: SearchFilters, allArticles?: Article[]) => {
        const articles = allArticles || get().articles;
        const { keyword, dateFrom, dateTo, category, source } = filters;

        const filteredArticles = articles.filter(article => {
          const matchesKeyword = filters.keyword ? article.title.toLowerCase().includes(keyword.toLowerCase()) ||
                  article.description.toLowerCase().includes(keyword.toLowerCase()) : true;
          const matchesDateFrom = filters.dateFrom ? new Date(article.publishedAt) >= new Date(dateFrom) : true;
          const matchesDateTo = filters.dateTo ? new Date(article.publishedAt) <= new Date(dateTo) : true;
          const matchesCategory = filters.category ? article.category === category : true;
          const matchesSource = filters.source ? article.source.id === source : true;
          return matchesKeyword && matchesDateFrom && matchesDateTo && matchesCategory && matchesSource;
        });

        set({ searchFilters: filters, filteredArticles });
        return filteredArticles
      },

      updateSearchFilters: (filters) => {
        set(state => ({
          searchFilters: { ...state.searchFilters, ...filters }
        }));
        get().fetchArticles();
      },

      toggleSource: (sourceId) => {
        set(state => ({
          userPreferences: {
            ...state.userPreferences,
            sources: state.userPreferences.sources.map(source =>
              source.id === sourceId
                ? { ...source, enabled: !source.enabled }
                : source
            )
          }
        }));
        get().fetchArticles();
      },

      toggleCategory: (categoryId) => {
        set(state => ({
          userPreferences: {
            ...state.userPreferences,
            categories: state.userPreferences.categories.map(category =>
              category.id === categoryId
                ? { ...category, enabled: !category.enabled }
                : category
            )
          }
        }));
        get().fetchArticles();
      },

      resetFilters: () => {
        set({
          searchFilters: initialSearchFilters,
        });
        get().fetchArticles();
      },
    }),
    {
      name: 'news-preferences',
      partialize: (state) => ({ userPreferences: state.userPreferences }),
    }
  )
);