import axios from 'axios';
import { SearchResponse } from '../types/License';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const licenseAPI = {
    search: async (query: string): Promise<SearchResponse> => {
        const response = await axios.get(`${API_BASE_URL}/licenses/search`, {
            params: { query }
        });
        return response.data;
    },

    getAll: async (): Promise<SearchResponse> => {
        const response = await axios.get(`${API_BASE_URL}/licenses`);
        return response.data;
    },

    downloadPDF: (licenseNumber: string): string => {
        return `${API_BASE_URL.replace('/api', '')}/uploads/${licenseNumber}.pdf`;
    }
};
