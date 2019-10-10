const db = {
    uri: 'mongodb://' + (process.env.HOST || 'localhost') + ':27017/semilleros_db' 
};

module.exports = db;