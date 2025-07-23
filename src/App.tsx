import { useState, useCallback, useEffect } from 'react';
import { Header, ArticleList } from './components/organisms';
import { SearchBar, ErrorMessage, Pagination, TrendingTopics } from './components/molecules';
import type { NYTArticle } from './types';
import { articleService, APIError } from './services/api';
import { useDebounce } from './hooks/useDebounce';
import './App.css';

const RESULTS_PER_PAGE = 10;

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState<NYTArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const searchArticles = useCallback(async (query: string, page: number) => {
    if (!query.trim()) {
      setArticles([]);
      setTotalResults(0);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await articleService.searchArticles({
        q: query,
        page: page - 1,
      });

      // Validate response structure
      if (!response || !response.response || !Array.isArray(response.response.docs)) {
        throw new Error('Invalid API response structure');
      }

      console.log('Setting articles:', response.response.docs.length, 'articles');
      console.log('First article:', response.response.docs[0]);

      setArticles(response.response.docs);
      setTotalResults(response.response.meta?.hits || 0);
      setHasSearched(true);
    } catch (err) {
      console.error('Search error in App component:', err);
      setArticles([]);
      setTotalResults(0);
      
      if (err instanceof APIError) {
        console.error('APIError:', err.message, err.statusCode, err.originalError);
        setError(err.message);
      } else {
        console.error('Unknown error:', err);
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load homepage articles on initial mount
  useEffect(() => {
    // Only load homepage articles if no search has been performed yet
    if (!hasSearched && !searchQuery && !debouncedSearchQuery) {
      searchArticles('', 1); // Empty query for homepage
    }
  }, [hasSearched, searchQuery, debouncedSearchQuery, searchArticles]);

  useEffect(() => {
    if (debouncedSearchQuery) {
      searchArticles(debouncedSearchQuery, currentPage);
    } else if (hasSearched) {
      // Only clear if user has performed a search before
      setArticles([]);
      setTotalResults(0);
      setHasSearched(false);
    }
  }, [debouncedSearchQuery, currentPage, searchArticles, hasSearched]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleRetry = useCallback(() => {
    searchArticles(searchQuery, currentPage);
  }, [searchQuery, currentPage, searchArticles]);

  const handleTopicSearch = useCallback((topic: string) => {
    handleSearch(topic);
    // Scroll to results section
    setTimeout(() => {
      document.querySelector('.results-section')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 100);
  }, [handleSearch]);

  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        <section id="search-section" className="search-section">
          <SearchBar
            onSearch={handleSearch}
            isLoading={isLoading}
            placeholder="Search articles (e.g., technology, politics, climate change)"
          />
        </section>

        {/* Show trending topics on homepage */}
        {!searchQuery && !debouncedSearchQuery && !isLoading && (
          <TrendingTopics onTopicClick={handleTopicSearch} />
        )}

        <section className="results-section">
          {!searchQuery && !debouncedSearchQuery && articles.length > 0 && (
            <div className="section-header">
              <h2 className="section-title">Latest Stories</h2>
              <p className="section-subtitle">Stay informed with the most recent news and analysis</p>
            </div>
          )}
          
          {searchQuery && (
            <div className="section-header">
              <h2 className="section-title">Search Results</h2>
              <p className="section-subtitle">
                Found {totalResults} articles for "{searchQuery}"
              </p>
            </div>
          )}
          
          {error ? (
            <ErrorMessage
              message={error}
              onRetry={handleRetry}
            />
          ) : (
            <>
              <ArticleList
                articles={articles}
                isLoading={isLoading}
                hasSearched={hasSearched}
              />
              
              {articles.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalResults={totalResults}
                  resultsPerPage={RESULTS_PER_PAGE}
                  onPageChange={handlePageChange}
                  isLoading={isLoading}
                />
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
