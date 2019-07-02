require('dotenv').config({path: '../'});
const mocha = require ('mocha');
const expect = require ('chai').expect;
const request = require ('supertest');
const app = require('../app');

describe('GET /movie', () => {
    it('should return a 401 when authorization headers are not supplied', () => {
        return request(app)
            .get('/movie')
            .expect(401)
            .expect({'error': 'request could not be authorized'});
    });

    it('should return a 401 when an invalid authorization is supplied', () => {
        return request(app)
            .get('/movie')
            .set('Authorization', 'Bearer INVALID')
            .expect(401)
            .expect('Content-Type', /json/)
            .expect({'error': 'request could not be authorized'});
    });

    it('should return a JSON body when a proper authorization header is supplied', () => {
        return request(app)
            .get('/movie')
            .set('Authorization', 'Bearer ' + process.env.API_KEY)
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('should return an error when avg_vote query param is not a numeric string', () => {
        return request(app)
            .get('/movie?avg_vote=NaN')
            .set('Authorization', 'Bearer ' + process.env.API_KEY)
            .expect(400)
            .expect('Content-Type', /json/)
            .expect({'error': 'avg_vote must be supplied as a number'});
    });
});