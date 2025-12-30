import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
    isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    const handleClear = () => {
        setQuery('');
    };

    return (
        <div className="w-full max-w-3xl mx-auto mb-8 animate-fadeIn">
            <form onSubmit={handleSubmit} className="relative">
                <div className="relative group">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="חפש לפי מספר רישיון (8 ספרות) או שם מוצר..."
                        className="w-full px-6 py-4 pr-12 text-lg text-gray-800 bg-white/95 backdrop-blur-sm border-2 border-transparent rounded-2xl shadow-xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-200 transition-all duration-300 placeholder-gray-400 font-hebrew"
                        dir="rtl"
                        disabled={isLoading}
                    />

                    {query && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            disabled={isLoading}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}

                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading || !query.trim()}
                    className="mt-4 w-full px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] font-hebrew"
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            מחפש...
                        </span>
                    ) : (
                        'חיפוש'
                    )}
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
