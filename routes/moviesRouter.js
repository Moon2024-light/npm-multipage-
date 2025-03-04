const express = require('express');
const router = express.Router();
const moviesData = require('../data/movies.json');


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

module.exports = router;