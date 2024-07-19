import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import multer from 'multer';
import path from 'path';
import { query } from '@/lib/db';

// Configure multer for file uploads
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(process.cwd(), 'public/schoolImages'));
        },
        filename: (req, file, cb) => {
            const uniqueName = Date.now() + '-' + file.originalname;
            cb(null, uniqueName);
        },
    }),
});

// Create a next-connect handler
const handler = nextConnect({
    // Optional: Add any options here
});

// Middleware to handle file uploads
handler.use(upload.single('file'));

// GET method to fetch schools
handler.get(async (req, res) => {
    try {
        const schools = await query({
            query: "SELECT * FROM schools",
            values: [],
        });

        const data = JSON.stringify(schools);

        res.status(200).json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: 'Error fetching schools' });
    }
});

// POST method to add a school
handler.post(async (req, res) => {
    const { name, address, city, state, contact, email_id } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: 'Image file is required' });
    }

    const fileName = file.filename; // Unique file name

    try {
        // Save school data to the database
        await query({
            query: 'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            values: [name, address, city, state, contact, fileName, email_id],
        });

        res.status(200).json({ message: 'School added successfully!' });
    } catch (dbError) {
        res.status(500).json({ error: 'Database error' });
    }
});

export default handler;
