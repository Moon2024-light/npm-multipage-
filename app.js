const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
const moviesRouter = require('./routes/moviesRouter');
const directorsRouter = require('./routes/directorsRouter');

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


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    console.log("Movie Image URL:", movie.image); 
    if (!movie) return res.status(404).send("Movie not found");
    res.render('movies_details', { movie });
});

const fetch = require('node-fetch'); 

app.get('/proxy-image', async (req, res) => {
    const imageUrl = req.query.url;
    try {
        const response = await fetch(imageUrl);
        const buffer = await response.buffer();
        res.set('Content-Type', 'image/jpeg');
        res.send(buffer);
    } catch (error) {
        console.error("Image fetch error:", error);
        res.status(500).send('Error fetching image');
    }
});