/**
 * Formats the license ID for display according to business rules:
 * - If notification number is long (>10 digits), show only last 4 digits
 * - If notification number contains slashes, remove them
 * - Otherwise, return the notification number as-is
 */
export const formatLicenseId = (notificationNumber: string): string => {
    // Remove whitespace
    const cleaned = notificationNumber.trim();

    // If contains slashes, remove them
    if (cleaned.includes('/')) {
        return cleaned.replace(/\//g, '');
    }

    // If long number (>10 digits), show only last 4
    if (cleaned.length > 10 && /^\d+$/.test(cleaned)) {
        return cleaned.slice(-4);
    }

    return cleaned;
};

/**
 * Creates the description string for display
 * Format: "FormattedID - ProductName"
 */
export const createDescription = (notificationNumber: string, productName: string): string => {
    const formattedId = formatLicenseId(notificationNumber);
    return `${formattedId} - ${productName}`;
};
