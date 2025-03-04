const express = require('express');
const router = express.Router();
const directorsData = require('../data/directors.json'); 


router.get('/', (req, res) => {
    res.render('directors', { directors: directorsData });
});


router.get('/:id', (req, res) => {
    const director = directorsData.find(d => d.id == req.params.id); 
    if (director) {
        res.render('directors_detail', { director });  
    } else {
        res.status(404).send(' Director not found');
    }
});


router.get('/info', (req, res) => {
    res.render('directors_detail', { directors: directorsData });
});

module.exports = router;
