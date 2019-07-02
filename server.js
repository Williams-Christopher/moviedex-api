require ('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const MOVIE_DATA = require('./movies-data-small.json');

const app = express();

app.use(morgan('common'));
app.use(function validateHeaderAuthorization(req, res, next) {
    let apiKey = process.env.API_KEY;
    let authKey = req.get('Authorization');
    if(!authKey || authKey.split(' ')[1] !== apiKey) {
        return res.status(401).json({'error': 'request could not be authorized'})
    }
    next();
});
app.use(cors());
app.use(helmet());

app.get('/movie', handleMovieRequest);

function handleMovieRequest(req, res) {
    // accept genre, country, or avg_vote search query params
    // genre: string - case insensitive search
    // country: string - case insensitive search
    // avg_vote: Number(string) -  >= the supplied
debugger;
    let {genre, country, avg_vote} = req.query;

    // some validation and setting defualts
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

    res.send('awesome');
}

const PORT = 8000;
app.listen(PORT, () => {console.log(`Listening at http://localhost:${PORT}/`)});