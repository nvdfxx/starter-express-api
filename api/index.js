const moment = require("moment");
const md5 = require("md5");

const Ranks = {
    Qualifying: 0,
    Bronze_V: 1,
    Bronze_IV: 2,
    Bronze_III: 3,
    Bronze_II: 4,
    Bronze_I: 5,
    Silver_V: 6,
    Silver_IV: 7,
    Silver_III: 8,
    Silver_II: 9,
    Silver_I: 10,
    Gold_V: 11,
    Gold_IV: 12,
    Gold_III: 13,
    Gold_II: 14,
    Gold_I: 15,
    Platinum_V: 16,
    Platinum_IV: 17,
    Platinum_III: 18,
    Platinum_II: 19,
    Platinum_I: 20,
    Diamond_V: 21,
    Diamond_IV: 22,
    Diamond_III: 23,
    Diamond_II: 24,
    Diamond_I: 25,
    Master: 26,
    Grandmaster: 27
}

function timeStamp() {
    return moment()
      .utc()
      .format("YYYYMMDDHHmmss");
}

const URL = 'https://api.paladins.com/paladinsapi.svc'

function getSignature(method) {
    return md5(`${process.env.DEV_ID}${method}${process.env.AUTH_KEY}${timeStamp()}`)
}

let SESSION_ID = null

async function getSession() {
    if(!SESSION_ID) {
        const url = `${URL}/createsessionJson/${process.env.DEV_ID}/${getSignature('createsession')}/${timeStamp()}`
        const res = await fetch(url)
        const parsed = await res.json()
        //console.log(parsed)
        SESSION_ID = parsed.session_id
    }
    return SESSION_ID
}

async function getPlayer(nickname) {
    try {
        const session_id = await getSession()
        const url = `${URL}/getplayerjson/${process.env.DEV_ID}/${getSignature('getplayer')}/${session_id}/${timeStamp()}/${nickname}`
        const res = await fetch(url)
        const parsed = await res.json()
        return parsed[0]
    } catch (error) {
        console.log(error)
    }
}

async function getPlayerMatchHistory(id) {
    try {
        const session_id = await getSession()
        //console.log(player)
        const url = `${URL}/getmatchhistoryjson/${process.env.DEV_ID}/${getSignature('getmatchhistory')}/${session_id}/${timeStamp()}/${id}`
        const res = await fetch(url)
        const parsed = await res.json()
        const sanitized = parsed.filter(e => e.Queue == 'Ranked').map(e => {
            const {Kills, Deaths, Win_Status, Assists, Match_Time} = e 
            return {Kills, Deaths, Win_Status, Assists, Match_Time}
        })
        return sanitized
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getPlayer,
    getPlayerMatchHistory,
    Ranks
}
