const express = require('express')
const app = express()
app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo2!')
})

const paladinsJS = require('paladins.js')

const api = new paladinsJS.API({
    devId: process.env.DEV_ID,
    authKey: process.env.AUTH_KEY
});



app.get('/test', (req, res) => {

    return api.getPlayer('Tzzunami').then(r => res.send(r))

})

app.listen(process.env.PORT || 3000, () => console.log('started'))