const moment = require("moment");
const md5 = require("md5");

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
            const {Kills, Deaths, Win_Status, Assists} = e 
            return {Kills, Deaths, Win_Status, Assists}
        })
        return sanitized
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getPlayer,
    getPlayerMatchHistory
}
