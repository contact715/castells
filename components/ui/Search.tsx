import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackSearch } from '../../lib/analytics';

interface SearchResult {
  title: string;
  url: string;
  type: 'page' | 'service' | 'industry' | 'case-study' | 'blog';
  description?: string;
}

interface SearchProps {
  onNavigate?: (url: string) => void;
  className?: string;
}

// Simple search index (in production, use a proper search service)
const searchIndex: SearchResult[] = [
  // Pages
  { title: 'Home', url: '/', type: 'page' },
  { title: 'About Us', url: '/about', type: 'page', description: 'Learn about Castells Agency' },
  { title: 'Services', url: '/services', type: 'page', description: 'Our marketing services' },
  { title: 'Work', url: '/work', type: 'page', description: 'Case studies and portfolio' },
  { title: 'Blog', url: '/blog', type: 'page', description: 'Marketing insights and strategies' },
  { title: 'Contact', url: '/contact', type: 'page', description: 'Get in touch with us' },
  { title: 'Team', url: '/team', type: 'page', description: 'Meet our team' },
  { title: 'Careers', url: '/careers', type: 'page', description: 'Join our team' },
  
  // Services (add more as needed)
  { title: 'Web Development', url: '/services/web-development', type: 'service' },
  { title: 'Meta Ads', url: '/services/meta-ads', type: 'service' },
  { title: 'Google Ads', url: '/services/google-ads', type: 'service' },
  { title: 'SEO', url: '/services/seo', type: 'service' },
  
  // Industries (add more as needed)
  { title: 'Construction', url: '/industries/construction', type: 'industry' },
  { title: 'Home Services', url: '/industries/home-services', type: 'industry' },
];

const Search: React.FC<SearchProps> = React.memo(({ onNavigate, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setQuery('');
        setResults([]);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
        setResults([]);
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const lowerQuery = searchQuery.toLowerCase();
    const filtered = searchIndex.filter(item => 
      item.title.toLowerCase().includes(lowerQuery) ||
      item.description?.toLowerCase().includes(lowerQuery)
    );

    setResults(filtered.slice(0, 8)); // Limit to 8 results
    
    if (filtered.length > 0) {
      trackSearch(searchQuery, filtered.length);
    }
  }, []);

  const handleSelectResult = useCallback((result: SearchResult) => {
    if (onNavigate) {
      onNavigate(result.url);
    } else {
      window.location.href = result.url;
    }
    setIsOpen(false);
    setQuery('');
    setResults([]);
  }, [onNavigate]);

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Search Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        aria-label="Search"
        aria-expanded={isOpen}
      >
        <SearchIcon className="w-5 h-5 text-text-primary dark:text-white" />
      </button>

      {/* Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[9998]"
              onClick={() => setIsOpen(false)}
            />

            {/* Search Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-[9999] bg-white dark:bg-surface rounded-[2rem] shadow-2xl border border-black/10 dark:border-white/10"
            >
              <div className="p-4">
                {/* Search Input */}
                <div className="relative mb-4">
                  <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-12 pr-10 py-3 bg-ivory dark:bg-black/20 rounded-xl border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-coral text-text-primary dark:text-white"
                    aria-label="Search input"
                  />
                  {query && (
                    <button
                      onClick={() => {
                        setQuery('');
                        setResults([]);
                      }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
                      aria-label="Clear search"
                    >
                      <X className="w-4 h-4 text-text-secondary" />
                    </button>
                  )}
                </div>

                {/* Results */}
                {query && (
                  <div className="max-h-96 overflow-y-auto">
                    {results.length > 0 ? (
                      <div className="space-y-1">
                        {results.map((result, index) => (
                          <button
                            key={index}
                            onClick={() => handleSelectResult(result)}
                            className="w-full text-left p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="font-semibold text-text-primary dark:text-white mb-1">
                                  {result.title}
                                </div>
                                {result.description && (
                                  <div className="text-sm text-text-secondary dark:text-white/70">
                                    {result.description}
                                  </div>
                                )}
                                <div className="text-xs text-text-secondary dark:text-white/50 mt-1">
                                  {result.type.replace('-', ' ')}
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-text-secondary dark:text-white/70">
                        No results found for "{query}"
                      </div>
                    )}
                  </div>
                )}

                {/* Keyboard Shortcut Hint */}
                {!query && (
                  <div className="text-xs text-text-secondary dark:text-white/50 text-center py-4">
                    Press <kbd className="px-2 py-1 bg-black/5 dark:bg-white/10 rounded">Esc</kbd> to close
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
});

Search.displayName = 'Search';

export default Search;

