const express = require('express')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo2!')
})

const {getPlayer, getPlayerMatchHistory} = require('./api');

app.get('/test', async (req, res) => {
    const s = await getPlayerMatchHistory('ZeroImpaqt')
    res.send(s)
})

app.listen(process.env.PORT || 3000, () => console.log('started'))