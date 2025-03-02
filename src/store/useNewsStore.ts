import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Article, SearchFilters, UserPreferences } from '../types';
import { fetchAllNews } from '../services/api';
import { initialCategories, initialSearchFilters, initialSources } from '../services/constants';

interface NewsState {
  articles: Article[];
  filteredArticles: Article[];
  isLoading: boolean;
  error: string | null;
  searchFilters: SearchFilters;
  userPreferences: UserPreferences;

  // Actions
  fetchArticles: () => Promise<void>;
  updateSearchFilters: (filters: Partial<SearchFilters>) => void;
  toggleSource: (sourceId: string) => void;
  toggleCategory: (categoryId: string) => void;
  toggleAuthor: (authorId: string) => void;
  resetFilters: () => void;
}

// Create the store
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
        categories: initialCategories,
        authors: [],
      },

      fetchArticles: async () => {
        set({ isLoading: true, error: null });
        try {
          const { searchFilters, userPreferences } = get();

          // Get enabled sources
          const enabledSources = userPreferences.sources
            .filter(source => source.enabled)
            .map(source => source.id);

          // Get enabled categories
          // const enabledCategories = userPreferences.categories
          //   .filter(category => category.enabled)
          //   .map(category => category.id);

          const articles = await fetchAllNews(
            searchFilters.keyword,
            searchFilters.category,
            searchFilters.dateFrom,
            searchFilters.dateTo,
            enabledSources
          );
          console.log({articles});

          // Apply filters
          let filteredArticles = articles;

          // Filter by keyword
          if (searchFilters.keyword) {
            const keyword = searchFilters.keyword.toLowerCase();
            filteredArticles = filteredArticles.filter(
              article =>
                article.title.toLowerCase().includes(keyword) ||
                article.description.toLowerCase().includes(keyword)
            );
          }

          // Filter by date range
          if (searchFilters.dateFrom) {
            const fromDate = new Date(searchFilters.dateFrom);
            filteredArticles = filteredArticles.filter(
              article => new Date(article.publishedAt) >= fromDate
            );
          }

          if (searchFilters.dateTo) {
            const toDate = new Date(searchFilters.dateTo);
            filteredArticles = filteredArticles.filter(
              article => new Date(article.publishedAt) <= toDate
            );
          }

          // Filter by category
          if (searchFilters.category && searchFilters.category !== 'all') {
            filteredArticles = filteredArticles.filter(
              article => article.category === searchFilters.category
            );
          }

          // Filter by source
          // if (searchFilters.source && searchFilters.source !== 'all') {
          //   filteredArticles = filteredArticles.filter(
          //     article => article.source.id === searchFilters.source
          //   );
          // }

          // Filter by enabled sources
          // if (enabledSources.length > 0) {
          //   filteredArticles = filteredArticles.filter(
          //     article => enabledSources.includes(article.source.id)
          //   );
          // }

          // Filter by enabled categories
          // if (enabledCategories.length > 0) {
          //   filteredArticles = filteredArticles.filter(
          //     article => enabledCategories.includes(article.category)
          //   );
          // }

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

      // Update search filters
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

      // Toggle author enabled/disabled
      toggleAuthor: (authorId) => {
        set(state => ({
          userPreferences: {
            ...state.userPreferences,
            authors: state.userPreferences.authors.map(author =>
              author.id === authorId
                ? { ...author, enabled: !author.enabled }
                : author
            )
          }
        }));
        get().fetchArticles();
      },

      // Reset all filters
      resetFilters: () => {
        set({
          searchFilters: initialSearchFilters,
          userPreferences: {
            sources: initialSources,
            categories: initialCategories,
            authors: [],
          }
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