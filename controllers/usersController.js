const User =  require('../models/User')

module.exports.allUsers = async function(req, res) {
    try {
      if(req.query.pw != process.env.ADMIN_PW) return res.send('incorrect pw')
      let users = await User.find({})
      //console.log(users)
      return res.send(users)
    } catch(e) {
      return res.sendStatus(505)
    }
}

module.exports.create = async function(req, res) {
    try {
      if(req.query.pw != process.env.ADMIN_PW) return res.send('incorrect pw')
      if(!req.query.nickname) return res.send('incorrect nickname')
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