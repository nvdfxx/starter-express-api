const {Ranks, getPlayer, getPlayerStatus, getActiveMatchDetails} = require('../api')

module.exports.currentMatchController = async function(req, res) {
    try {
        let player = await getPlayer(req.query.query ? encodeURIComponent(req.query.query) : encodeURIComponent(req.query.player))
        let status = await getPlayerStatus(player.Id)
        console.log(status)
        if(status.Match) {
            let match = await getActiveMatchDetails(status.Match)
            //console.log(match)
            let team1 = match.filter(e => e.taskForce == 1).map(e => `${e.playerName} - ${e.ChampionName} - ${Object.keys(Ranks)[e.Tier].replace('_', ' ')}`).join(';\n')
            let team2 = match.filter(e => e.taskForce == 2).map(e => `${e.playerName} - ${e.ChampionName} - ${Object.keys(Ranks)[e.Tier].replace('_', ' ')}`).join(';\n')
            
            return res.send('Team 1:\n' + team1 + '\n' + 'Team 2:\n' + team2)
        } else {
            return res.send('Error: Player is: ' + status.status_string)
        }
    } catch(e) {
        console.log(e)
        return res.send('Error: Something went wrong.')
    }
}