import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import moviesRouter from './routes/moviesRouter.js';
import directorsRouter from './routes/directorsRouter.js';

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
    res.render('layout', { 
        title: 'Home - Movie Website', 
        body: 'index'  
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});





