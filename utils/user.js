const parseUsers = (str) => str.split(',').map(e => e.split(':')).map(e => ({nickname: e[0], token: e[1], date: new Date()}))

const usersFallback = 'Tzzunami:pfj2pawjofjowkpfaw,HachimitsuYudok:wierjneanfokwof,ZeroImpaqt:oibhfanwdaiwfjoa'

const USERS = process.env.USERS ? parseUsers(process.env.USERS) : parseUsers(usersFallback)

module.exports = {
    findByToken(token) {
        return USERS.find(e => e.token == token)
    }
}