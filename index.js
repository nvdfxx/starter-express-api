const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config()


const app = express()

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const {indexController} = require('./controllers/indexController')
const {widgetController} = require('./controllers/widgetController')
const {winrateController} = require('./controllers/winrateController')
const {eloController} = require('./controllers/eloController')
const {currentMatchController} = require('./controllers/currentMatchController')
const {deckController} = require('./controllers/deckController')
const {allUsers, create} = require('./controllers/usersController')

app.get('/', indexController)
app.get('/deck', deckController)
app.get('/widget', widgetController)
app.get('/winrate', winrateController)
app.get('/cm', currentMatchController)
app.get('/rank', eloController)
app.get('/users', allUsers)
app.get('/users/create', create)

// const {getPlayer, getPlayerMatchHistory} = require('./api');

// app.get('/test', async (req, res) => {
//     const s = await getPlayerMatchHistory('ZeroImpaqt')
//     res.send(s)
// })

let port = process.env.PORT || 3000

const serve = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => console.log('server started'));
  } catch (error) {
    console.log(error);
  }
}

serve()