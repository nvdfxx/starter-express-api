const paladinsJS = require('paladins.js')

const api = new paladinsJS.API({
    devId: process.env.DEV_ID,
    authKey: process.env.AUTH_KEY
});

module.exports = api