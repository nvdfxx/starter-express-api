const express = require('express')
const path = require('path')
const app = express()

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo2!')
})

const {widgetController} = require('./controllers/widgetController')
const {winrateController} = require('./controllers/winrateController')

app.get('/widget', widgetController)
app.get('/winrate', winrateController)

// const {getPlayer, getPlayerMatchHistory} = require('./api');

// app.get('/test', async (req, res) => {
//     const s = await getPlayerMatchHistory('ZeroImpaqt')
//     res.send(s)
// })

app.listen(process.env.PORT || 3000, () => console.log('started'))