import express, { Request, Response } from 'express';
import License from '../models/License';
import path from 'path';

const router = express.Router();

// Search licenses by ID or product name
router.get('/search', async (req: Request, res: Response) => {
    try {
        const { query } = req.query;

        if (!query || typeof query !== 'string') {
            return res.status(400).json({ error: 'Search query is required' });
        }

        const searchQuery = query.trim();

        // Build search criteria
        const searchCriteria: any = {
            $or: [
                { licenseNumber: searchQuery },
                { productName: { $regex: searchQuery, $options: 'i' } }
            ]
        };

        const licenses = await License.find(searchCriteria).sort({ createdAt: -1 });

        res.json({
            success: true,
            count: licenses.length,
            data: licenses
        });
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ error: 'Server error during search' });
    }
});

// Get all licenses
router.get('/', async (req: Request, res: Response) => {
    try {
        const licenses = await License.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            count: licenses.length,
            data: licenses
        });
    } catch (error) {
        console.error('Get licenses error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get single license by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const license = await License.findById(req.params.id);

        if (!license) {
            return res.status(404).json({ error: 'License not found' });
        }

        res.json({
            success: true,
            data: license
        });
    } catch (error) {
        console.error('Get license error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Create new license
router.post('/', async (req: Request, res: Response) => {
    try {
        const { licenseNumber, notificationNumber, productName, country, manufacturer } = req.body;

        const license = new License({
            licenseNumber,
            notificationNumber,
            productName,
            country,
            manufacturer
        });

        await license.save();

        res.status(201).json({
            success: true,
            data: license
        });
    } catch (error: any) {
        console.error('Create license error:', error);

        if (error.code === 11000) {
            return res.status(400).json({ error: 'License number already exists' });
        }

        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
