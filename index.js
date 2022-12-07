const express = require('express')
const app = express()
app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo2!')
})

app.get('/test', (req, res) => {
    res.send('Yo3!')
})

app.listen(process.env.PORT || 3000, () => console.log('started'))