import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import { License } from './types/License';
import { licenseAPI } from './services/api';

function App() {
    const [licenses, setLicenses] = useState<License[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (query: string) => {
        setIsLoading(true);
        setError(null);
        setHasSearched(true);

        try {
            const response = await licenseAPI.search(query);
            setLicenses(response.data);
        } catch (err: any) {
            console.error('Search error:', err);
            setError(err.response?.data?.error || 'שגיאה בחיפוש. אנא נסה שוב.');
            setLicenses([]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="text-center mb-12 animate-fadeIn">
                    <div className="inline-block p-8 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl">
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-3 font-hebrew">
                            מערכת רישיונות קוסמטיקה
                        </h1>
                        <p className="text-gray-600 text-lg font-hebrew" dir="rtl">
                            חפש והורד רישיונות קוסמטיקה בקלות
                        </p>
                    </div>
                </header>

                {/* Search Bar */}
                <SearchBar onSearch={handleSearch} isLoading={isLoading} />

                {/* Error Message */}
                {error && (
                    <div className="max-w-3xl mx-auto mb-6 animate-fadeIn">
                        <div className="bg-red-50 border-r-4 border-red-500 p-4 rounded-lg shadow-md" dir="rtl">
                            <div className="flex items-center gap-3">
                                <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-red-700 font-medium font-hebrew">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Search Results */}
                <SearchResults
                    licenses={licenses}
                    isLoading={isLoading}
                    hasSearched={hasSearched}
                />

                {/* Footer */}
                <footer className="mt-16 text-center animate-fadeIn">
                    <div className="inline-block px-6 py-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
                        <p className="text-gray-600 font-hebrew" dir="rtl">
                            מערכת ניהול רישיונות קוסמטיקה © 2025
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default App;
