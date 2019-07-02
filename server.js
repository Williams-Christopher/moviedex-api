const app = require('./app');

// Start me up
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    if(process.env.NODE_ENV !== 'production') {
        console.log(`Listening at http://localhost:${PORT}/`)
    }
});