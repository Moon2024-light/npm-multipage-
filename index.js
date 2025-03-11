import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import moviesRouter from './routes/moviesRouter.js';
import directorsRouter from './routes/directorsRouter.js';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/movies', moviesRouter);
app.use('/directors', directorsRouter);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    console.log("Movie Image URL:", movie?.image);
    if (!movie) return res.status(404).send("Movie not found");
    res.render('movies_details', { movie });
});

app.get('/proxy-image', async (req, res) => {
    const imageUrl = req.query.url;
    try {
        const response = await fetch(imageUrl);
        const buffer = await response.arrayBuffer();
        res.set('Content-Type', 'image/jpeg');
        res.send(Buffer.from(buffer));
    } catch (error) {
        console.error("Image fetch error:", error);
        res.status(500).send('Error fetching image');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
