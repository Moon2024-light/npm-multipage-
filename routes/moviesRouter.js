import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Read movies data
const moviesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/movies.json'), 'utf-8'));

// Route for movies page
router.get('/', (req, res) => {
    res.render('movies', { 
        movies: moviesData, 
        title: 'Movies'
    });
});

router.get('/:id', (req, res) => {
    const movie = moviesData.find(m => m.id == req.params.id);
    
    if (movie) {
        console.log("Movie title:", movie.title); // Debugging log
        res.render('movies_detail', { movie, title: movie.title });
    } else {
        res.status(404).send('Movie not found');
    }
});

export default router;

