const {Ranks} = require('../api')

const WRDelta = (wr) => {
    const WRDeltas = [-2, -1, 0, 1, 2]
    const WRRanges = [[0, 19], [20, 48], [49, 59], [60, 80], [81, 100]]
    let r = WRRanges.findIndex(e => wr >= e[0] && wr <= e[1])
    const res = wr > 51 ? wr : wr * -1
    return res
    return WRDeltas[r]
}

const KDDelta = (kd) => {
    const KDDeltas = [-3, -2, -1, 0, 1, 2, 3]
    const KDRanges = [[0, 0.49], [0.5, 0.69], [0.7, 0.89], [0.9, 1.29], [1.3, 1.99], [2, 2.99], [3, 20]]
    let r = KDRanges.findIndex(e => kd >= e[0] && kd <= e[1])
    const res = kd > 1.3 ? kd : kd * -1
    return res
    return KDDeltas[r]
}

const RankDelta = data => {
    let d = data.tier + KDDelta(data.kd) + WRDelta(data.wr)
    if (d < 1) return 1
    if (d > 27) return 27
    return d
}

const TierDelta = tier => {
    const Tiers = ['S', 'A', 'B', 'C', 'D', 'E', 'F']
    const KDRanges = [[0, 12], [13, 17], [18, 20], [21, 23], [24, 25], [26, 26], [27, 27]]
    let r = KDRanges.findIndex(e => tier >= e[0] && tier <= e[1])
    return Tiers.reverse()[r]
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const EloDelta = data => {
    let d = data.tier * 100 + KDDelta(data.kd) * 100 + WRDelta(data.wr) //+ randomIntFromInterval(1, 50) * (Math.random() > 0.5 ? 1 : -1)
    return d
}

function elo(tier, matches) {
    let ranked = matches
    if (ranked.length < 10) {
        return `Для рассчета ELO требуется сыграть минимум 10 игр 
        в рейтинговом режиме за последние 50 игр`
    }
    let rank = ranked.map(e => ({ Kills: e.Kills, Deaths: e.Deaths, ws: e.Win_Status })).reduce((a, b, i, r) => {
        return {
            Kills: a.Kills + b.Kills,
            Deaths: a.Deaths + b.Deaths,
            Wins: r.filter(e => e.ws == 'Win').length,
            Losses: r.filter(e => e.ws == 'Loss').length
        }
    })
    let m = {
        kd: Number((rank.Kills / rank.Deaths).toFixed(2)),
        wr: Math.round((rank.Wins / (rank.Wins + rank.Losses)) * 100),
        tier,
        count: ranked.length
    }
    //console.log(m)
    const elo = EloDelta(m)
    return {rank: Object.keys(Ranks)[m.tier].replace('_', ' '), elo, defaultElo: Number(tier) * 100}
    //return TierDelta(RankDelta(m))
}

module.exports = elo