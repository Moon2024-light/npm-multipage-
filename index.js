import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import moviesRouter from './routes/moviesRouter.js';
import directorsRouter from './routes/directorsRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/pages'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/movies', moviesRouter);
app.use('/directors', directorsRouter);

app.get('/', (req, res) => {
    res.render('layout', { 
        title: 'Home - Movie Website', 
        body: 'index'  
    });
});

export default app;
