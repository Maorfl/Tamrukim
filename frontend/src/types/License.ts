export interface License {
    _id: string;
    licenseNumber?: string;
    notificationNumber?: string;
    productName: string;
    country: string;
    manufacturer: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface SearchResponse {
    success: boolean;
    count: number;
    data: License[];
}
