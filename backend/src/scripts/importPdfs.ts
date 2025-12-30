import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { PDFParse } from 'pdf-parse';
// let pdfParse = require('pdf-parse');
// // Handle possible default export mismatch
// if (typeof pdfParse !== 'function' && pdfParse.default) {
//     pdfParse = pdfParse.default;
// }
import License from '../models/License';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cosmetic-licenses';
const PDF_DIR = path.join(__dirname, '../../uploads'); // Scanning the uploads folder

// Regex patterns for Hebrew fields
// Note: Hebrew in PDFs can sometimes be reversed (Visual vs Logical). 
// These regexes attempt to catch standard "Key: Value" patterns.
const PATTERNS = {
    notification: /(?:מספר נוטיפיקציה|Notification Number|רישיון מספר|מספר רישיון)[:\s]+([\d\/]+)/i,
    productName: /(?:שם התמרוק|Product Name)[:\s]+(.+)/i,
    manufacturer: /(?:שם המפעל|Manufacturer|יצרן)[:\s]+(.+)/i,
    country: /(?:ארץ ייצור|Country of Origin|ארץ)[:\s]+(.+)/i,
    // Sometimes Hebrew is reversed in PDFs (e.g., "קורמתה םש")
    productNameRev: /(?:קורמתה םש)[:\s]+(.+)/i,
    countryRev: /(?:רוציי ץרא)[:\s]+(.+)/i
};

// Start the import process
async function importPdfs() {
    console.log('🚀 Starting PDF Importer...');
    console.log(`📂 Scanning directory: ${PDF_DIR}`);

    let successCount = 0;
    let failCount = 0;

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        if (!fs.existsSync(PDF_DIR)) {
            console.error(`❌ Directory not found: ${PDF_DIR}`);
            process.exit(1);
        }

        const files = fs.readdirSync(PDF_DIR).filter(file => file.toLowerCase().endsWith('.pdf'));
        console.log(`found ${files.length} PDF files.`);

        // Removed local declaration from here

        for (const file of files) {
            await processFile(file);
        }

        console.log('\n========================================');
        console.log(`🎉 Import Complete!`);
        console.log(`✅ Success: ${successCount}`);
        console.log(`❌ Failed: ${failCount}`);
        console.log('========================================');
        process.exit(0);

    } catch (error) {
        console.error('❌ Fatal Error:', error);
        process.exit(1);
    }

    async function processFile(filename: string) {
        try {
            // 1. Extract 8-digit License Number from filename
            const filenameMatch = filename.match(/^(\d{8})/);
            if (!filenameMatch) {
                console.log(`⚠️  Skipping ${filename}: Filename does not start with 8 digits.`);
                return;
            }
            const licenseNumber = filenameMatch[1];
            const filePath = path.join(PDF_DIR, filename);

            // 2. Parse PDF Text
            const dataBuffer = fs.readFileSync(filePath);
            const parser = new PDFParse({ data: dataBuffer });
            const data = await parser.getText();
            const text = data.text;

            // 3. Extract Fields using Regex
            const notificationMatch = text.match(PATTERNS.notification);
            const productMatch = text.match(PATTERNS.productName) || text.match(PATTERNS.productNameRev);
            const manufacturerMatch = text.match(PATTERNS.manufacturer);
            const countryMatch = text.match(PATTERNS.country) || text.match(PATTERNS.countryRev);

            // 4. Prepare Metadata (Fallback to "Unknown" if not found)
            const metadata = {
                licenseNumber: licenseNumber,
                notificationNumber: notificationMatch ? cleanText(notificationMatch[1]) : licenseNumber, // Fallback to ID if not found
                productName: productMatch ? cleanText(productMatch[1]) : "Unknown Product",
                manufacturer: manufacturerMatch ? cleanText(manufacturerMatch[1]) : "Unknown Manufacturer",
                country: countryMatch ? cleanText(countryMatch[1]) : "Unknown Country"
            };

            // 5. Reverse Hebrew if strictly detected as reversed (simple heuristic)
            // If the extracted text looks like it is reversed Hebrew chars, we might want to flip it.
            // For now, we save as extracted.

            // 6. Upsert to MongoDB
            await License.findOneAndUpdate(
                { licenseNumber: licenseNumber },
                metadata,
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );

            console.log(`✅ Processed ${licenseNumber}: ${metadata.productName}`);
            successCount++;

        } catch (err: any) {
            console.error(`❌ Error processing ${filename}:`, err.message);
            failCount++;
        }
    }
}

function cleanText(text: string): string {
    return text.trim().replace(/\r?\n|\r/g, " ").replace(/\s+/g, " ");
}

importPdfs();
