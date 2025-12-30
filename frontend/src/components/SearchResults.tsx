import React from 'react';
import { License } from '../types/License';
import LicenseCard from './LicenseCard';

interface SearchResultsProps {
    licenses: License[];
    isLoading: boolean;
    hasSearched: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ licenses, isLoading, hasSearched }) => {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white/80 rounded-2xl p-6 animate-shimmer">
                        <div className="h-6 bg-gray-200 rounded mb-4"></div>
                        <div className="space-y-3">
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!hasSearched) {
        return (
            <div className="text-center py-16 animate-fadeIn">
                <div className="inline-block p-6 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl">
                    <svg className="w-24 h-24 mx-auto mb-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-2xl font-bold text-gray-700 mb-2 font-hebrew" dir="rtl">
                        חפש רישיונות קוסמטיקה
                    </h3>
                    <p className="text-gray-500 font-hebrew" dir="rtl">
                        הזן מספר רישיון או שם מוצר כדי להתחיל
                    </p>
                </div>
            </div>
        );
    }

    if (licenses.length === 0) {
        return (
            <div className="text-center py-16 animate-fadeIn">
                <div className="inline-block p-6 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl">
                    <svg className="w-24 h-24 mx-auto mb-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-2xl font-bold text-gray-700 mb-2 font-hebrew" dir="rtl">
                        לא נמצאו תוצאות
                    </h3>
                    <p className="text-gray-500 font-hebrew" dir="rtl">
                        נסה לחפש עם מילות חיפוש אחרות
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="text-center mb-8 animate-fadeIn">
                <div className="inline-block px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                    <p className="text-lg font-semibold text-gray-700 font-hebrew" dir="rtl">
                        נמצאו {licenses.length} תוצאות
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {licenses.map((license, index) => (
                    <div key={license._id} style={{ animationDelay: `${index * 0.1}s` }}>
                        <LicenseCard license={license} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
