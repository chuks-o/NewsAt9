import { useState, useEffect } from 'react';
import Header from './components/templates/Header';
import Sidebar from './components/templates/Sidebar';
import ArticleList from './components/templates/ArticleList';
import FilterBar from './components/templates/FilterBar';
import { useNewsStore } from './store/useNewsStore';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const fetchArticles = useNewsStore(state => state.fetchArticles);

  // Fetch articles on component mount
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-6">Today's Headlines</h1>

            <FilterBar />

            <ArticleList />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App
