const User =  require('../models/User')

module.exports.allUsers = async function(req, res) {
    try {
      let users = await User.find({})
      //console.log(users)
      return res.send(users)
    } catch(e) {
      return res.sendStatus(505)
    }
}

module.exports.create = async function(req, res) {
    try {
      let user = new User({
          nickname: req.query.nickname
      })
      await user.save()
      //console.log(user)
      return res.send('User was added')
    } catch(e) {
      return res.sendStatus(505)
    }
}