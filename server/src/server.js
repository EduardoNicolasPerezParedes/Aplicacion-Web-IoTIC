const config = require('./config/config');
const app = require('./express');
const connect = require('./mongoose');

connect().catch((err) => {
    console.log('server: database connection error: %s', err.message);
});

// server
app.listen(config.port, (err) => {
    if (err) {
        console.error('server: error: %s', err.message);
    }
    console.log('server: listening on port %s.', config.port);
});