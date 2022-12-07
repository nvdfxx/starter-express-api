const api = require('../utils/api')
const Ranks = require('paladins.js/lib/util/enumerations').Ranks

module.exports.currentMatchController = async function(req, res) {
    try {
        if(req.query.player) {
            let player = await api.getPlayer(req.query.query ? encodeURIComponent(req.query.query) : encodeURIComponent(req.query.player))
            let status = await api.getPlayerStatus(player.Id)
            
            if(status.Match) {
                let match = await api.getActiveMatchDetails(status.Match)
                //console.log(match)
                let team1 = match.filter(e => e.taskForce == 1).map(e => `${e.playerName} - ${e.ChampionName} - ${Ranks[e.Tier].replace('_', ' ')}`).join('\n')
                let team2 = match.filter(e => e.taskForce == 2).map(e => `${e.playerName} - ${e.ChampionName} - ${Ranks[e.Tier].replace('_', ' ')}`).join('\n')
                
                return res.send('Team 1:\n' + team1 + '\n' + 'Team 1:\n' + team2)
            } else {
                return res.send('Player not in match!')
            }
        } else {
            return res.send('Nickname is important!')
        }
    } catch(e) {
        return res.send('Error: Something went wrong. NotLikeThis')
    }
}