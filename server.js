const app = require('./app');

// Start me up
const PORT = 8000;
app.listen(PORT, () => {console.log(`Listening at http://localhost:${PORT}/`)});