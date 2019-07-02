require ('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const MOVIE_DATA = require('./movies-data-small.json');

const app = express();

app.use(morgan('common'));
app.use(cors());
app.use(helmet());

app.get('/', handleMovieRequest);

function handleMovieRequest(req, res) {
    res.json(MOVIE_DATA);
}

const PORT = 8000;
app.listen(PORT, () => {console.log(`Listening at http://localhost:${PORT}/`)});