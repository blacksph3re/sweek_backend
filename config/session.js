module.exports = require('restify-memory-session')({
    debug : true,
    ttl : 6000            // Time to live in seconds
});