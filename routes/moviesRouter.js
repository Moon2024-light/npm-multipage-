import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Read JSON file synchronously
const moviesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/movies.json'), 'utf-8'));

router.get('/', (req, res) => {
    res.render('movies', { movies: moviesData });
});

router.get('/:id', (req, res) => {
    const movie = moviesData.find(m => m.id == req.params.id);
    if (movie) {
        res.render('movies_detail', { movie });
    } else {
        res.status(404).send('Movie not found');
    }
});

router.get('/info', (req, res) => {
    res.render('movies_detail', { movies: moviesData });
});

export default router;
