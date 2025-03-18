import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Read directors data
const directorsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/directors.json'), 'utf-8'));

// Route for directors page
router.get('/', (req, res) => {
    res.render('directors', {
        directors: directorsData,
        title: 'Directors'
    });
});

// Route for individual director details
router.get('/:id', (req, res) => {
    const director = directorsData.find(d => d.id == req.params.id);
    if (director) {
        res.render('directors-detail', { 
            director, 
            title: director.name 
        });
    } else {
        res.status(404).send('Director not found');
    }
});

export default router;
