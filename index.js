const express = require('express')
const app = express()
app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo2!')
})

app.get('/test', (req, res) => {
    return api.getPlayer('Tzzunami').then(r => res.send(r))
})

app.listen(process.env.PORT || 3000, () => console.log('started'))