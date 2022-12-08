module.exports.deckController = async function(req, res) {
    try {
      console.log(req.query)
      return res.send('deck')
    } catch(e) {
      return res.sendStatus(505)
    }
}