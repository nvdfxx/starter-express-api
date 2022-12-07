const User = require('../utils/user')
const {getPlayer, getPlayerMatchHistory, Ranks} = require('../api');
const {filter} = require('../utils')

module.exports.winrateController = async function(req, res) {
  try {
    let user = User.findByToken(req.query.token)
    console.log(user)
    if(user) {
      let player = await getPlayer(user.nickname)
      let matches = await getPlayerMatchHistory(player.Id)
      let ranked = matches.filter(e => new Date(e.Match_Time).getTime() > new Date(user.date).getTime())
      
      let data = ranked.map(e => ({ws: e.Win_Status})).reduce((a,b,i,r) => {
              return {
              Wins: r.filter(e => e.ws == 'Win').length,
              Losses: r.filter(e => e.ws == 'Loss').length
              }
          }, {Wins: 0, Losses: 0})
          
      data.tier = player.RankedKBM.Tier
      data.tp = player.RankedKBM.Points

      return res.json({data})
    } 
    return res.send('No user found with this token')
  } catch(e) {
      console.log(e)
      return res.json(e)
  }
}

