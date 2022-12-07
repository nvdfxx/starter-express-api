const api = require('../utils/api')
const elo = require('../utils/elo')

module.exports.eloController = async function (req, res) {
    try {
        if(!req.query.player) throw new Error()
        
        let player = await api.getPlayer(encodeURI(req.query.player));
        let playerRankedKBMTier = player.RankedKBM.Tier,
            playerRankedRankedControllerTier = player.RankedController.Tier;
        const playerMainTier = Math.max(
            playerRankedKBMTier,
            playerRankedRankedControllerTier
        );
        let matches = await api.getPlayerMatchHistory(player.Id)
        const playerMMR = elo(playerMainTier, matches);
        //console.log(player)
        return res.send(player.hz_player_name + ', твое эло: ' + playerMMR.toString())

    } catch (error) {
        return res.send('No player found with this nickname')
    }
};
