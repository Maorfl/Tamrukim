import React from 'react';
import { License } from '../types/License';
import { createDescription } from '../utils/formatters';
import { licenseAPI } from '../services/api';

interface LicenseCardProps {
    license: License;
}

const LicenseCard: React.FC<LicenseCardProps> = ({ license }) => {
    const description = createDescription(license.notificationNumber!, license.productName);
    const pdfUrl = licenseAPI.downloadPDF(license.licenseNumber!);

    const handleDownload = () => {
        window.open(pdfUrl, '_blank');
    };

    return (
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:scale-[1.02] animate-fadeIn">
            <div className="p-6">
                {/* Header with formatted description */}
                <div className="mb-4 pb-4 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 font-hebrew" dir="rtl">
                        {description}
                    </h3>
                </div>

                {/* License details */}
                <div className="space-y-3 mb-6" dir="rtl">
                    <div className="flex items-start gap-3">
                        <span className="text-sm font-semibold text-primary-700 min-w-[120px] font-hebrew">
                            מספר רישיון:
                        </span>
                        <span className="text-sm text-gray-700 font-mono bg-gray-100 px-3 py-1 rounded-lg">
                            {license.notificationNumber || license.licenseNumber}
                        </span>
                    </div>

                    <div className="flex items-start gap-3">
                        <span className="text-sm font-semibold text-primary-700 min-w-[120px] font-hebrew">
                            מספר הודעה:
                        </span>
                        <span className="text-sm text-gray-700 font-mono bg-gray-100 px-3 py-1 rounded-lg">
                            {license.notificationNumber}
                        </span>
                    </div>

                    <div className="flex items-start gap-3">
                        <span className="text-sm font-semibold text-primary-700 min-w-[120px] font-hebrew">
                            שם המוצר:
                        </span>
                        <span className="text-sm text-gray-700 font-hebrew">
                            {license.productName}
                        </span>
                    </div>

                    <div className="flex items-start gap-3">
                        <span className="text-sm font-semibold text-primary-700 min-w-[120px] font-hebrew">
                            ארץ ייצור:
                        </span>
                        <span className="text-sm text-gray-700 font-hebrew">
                            {license.country}
                        </span>
                    </div>

                    <div className="flex items-start gap-3">
                        <span className="text-sm font-semibold text-primary-700 min-w-[120px] font-hebrew">
                            יצרן:
                        </span>
                        <span className="text-sm text-gray-700 font-hebrew">
                            {license.manufacturer}
                        </span>
                    </div>
                </div>

                {/* Download button */}
                <button
                    onClick={handleDownload}
                    className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:from-emerald-700 hover:to-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] font-hebrew"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    הורד PDF
                </button>
            </div>

            {/* Decorative gradient bar */}
            <div className="h-2 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right"></div>
        </div>
    );
};

export default LicenseCard;
