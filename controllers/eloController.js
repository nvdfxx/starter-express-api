const {getPlayer, getPlayerMatchHistory} = require('../api');
const elo = require('../utils/elo')

module.exports.eloController = async function (req, res) {
    try {
        if(!req.query.player) throw new Error()
        
        let player = await getPlayer(encodeURI(req.query.query ? encodeURIComponent(req.query.query) : encodeURIComponent(req.query.player)));
        //console.log(player)
        let playerRankedKBMTier = player.RankedKBM.Tier,
            playerRankedRankedControllerTier = player.RankedController.Tier;
        const playerMainTier = Math.max(
            playerRankedKBMTier,
            playerRankedRankedControllerTier
        );
        let matches = await getPlayerMatchHistory(player.Id)
        const playerMMR = elo(playerMainTier, matches);
        //console.log(player)
        let eloParam = '- (normal)'
        if(playerMMR.elo - playerMMR.defaultElo > 50) eloParam = '↑ (high)'
        if(playerMMR.elo - playerMMR.defaultElo < -50) eloParam = '↓ (low)'

        let playerWins = player.RankedKBM.Wins
        let playerLosses = player.RankedKBM.Losses

        return res.send(`${player.hz_player_name}: ${playerMMR.rank} ${player.RankedKBM.Points} TP, ${playerWins + playerLosses} matches, ${Math.round((playerWins / (playerWins + playerLosses)) * 100)} %, ELO: ${playerMMR.elo} ${eloParam}`)

    } catch (error) {
        console.log(error)
        return res.send('No player found with this nickname')
    }
};
