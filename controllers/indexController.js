module.exports.indexController = function (req, res) {
    const host = `${req.protocol}://${req.get('host')}`
    //console.log(host)
    return res.render('index', { host, token: req.query.token || 'YOUR_TOKEN' })
}