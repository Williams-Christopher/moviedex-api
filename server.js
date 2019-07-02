require ('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const MOVIE_DATA = require('./movies-data-small.json');

const app = express();

// These really are sensitive to order. putting cors before helment casues
// the X-Powered-By header to continue to appear. Placeing cors near the
// bottom keeps it from working... /sheesh
// Middleware
app.use(morgan('common'));
app.use(helmet());
app.use(cors());
// Our custom Authorization function
app.use(function validateHeaderAuthorization(req, res, next) {
    let apiKey = process.env.API_KEY;
    let authKey = req.get('Authorization');
    if(!authKey || authKey.split(' ')[1] !== apiKey) {
        return res.status(401).json({'error': 'request could not be authorized'})
    }
    next();
});

// Our route handler and named callback
app.get('/movie', handleMovieRequest);

function handleMovieRequest(req, res) {
    // accept genre, country, or avg_vote search query params
    // genre: string - case insensitive search
    // country: string - case insensitive search
    // avg_vote: Number(string) -  >= the supplied
    let {genre, country, avg_vote} = req.query;

    // some quick validation and setting defualts
    if(!genre) {
        genre = '';
    }

    if(!country) {
        country = '';
    }

    if(avg_vote) {
        avg_vote = parseFloat(avg_vote);
        if(Number.isNaN(avg_vote)) {
            return res.status(400).json({'error': 'avg_vote must be supplied as a number'})
        }
    }

    let results = MOVIE_DATA;
    // filter on genre if provided
    if(genre !== '') {
        results = results.filter(m => m.genre.toLowerCase() === genre.toLowerCase());
    }

    // filter on country
    if(country !== '') {
        results = results.filter(m => m.country.toLowerCase() === country.toLowerCase());
    }

    // filter on avg_vote
    if(avg_vote) {
        results = results.filter(m => m.avg_vote >= avg_vote);
    }

    res.json(results);
}

// Start me up
const PORT = 8000;
app.listen(PORT, () => {console.log(`Listening at http://localhost:${PORT}/`)});