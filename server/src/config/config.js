const config = {
    host: process.env.SERVER_HOST || 'http://localhost',
    env: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 3000
};

module.exports = config;