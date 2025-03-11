import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Read JSON file synchronously
const directorsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/directors.json'), 'utf-8'));

router.get('/', (req, res) => {
    res.render('directors', { directors: directorsData });
});

router.get('/:id', (req, res) => {
    const director = directorsData.find(d => d.id == req.params.id);
    if (director) {
        res.render('directors_detail', { director });
    } else {
        res.status(404).send('Director not found');
    }
});

router.get('/info', (req, res) => {
    res.render('directors_detail', { directors: directorsData });
});

export default router;
