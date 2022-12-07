const User = require('../utils/user')

module.exports.widgetController = async function (req, res) {
    try {
        let user = User.findByToken(req.query.token)
        console.log(user)
        if (user) {
            if (req.query.restart) {
                let date = new Date()
                if (req.query.gap) {
                    if(!isNaN(Number(req.query.gap))) {
                        console.log(date.getHours())
                        let hours = date.getHours() - Number(req.query.gap)
                        console.log(hours)
                        date.setHours(hours)
                    }
                }
                user.date = new Date(date.getTime() + date.getTimezoneOffset() * 60000)
                return res.send('Your session was restarted')
            }
            return res.render('widget', { token: req.query.token })
        }
        return res.send('No user found with this token')
    } catch (e) {
        console.log(e)
        return res.sendStatus(505)
    }
}

