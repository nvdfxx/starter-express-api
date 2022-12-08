module.exports.indexController = function (req, res) {
    const host = req.get('host')
    return res.render('index', { host, token: req.query.token || 'YOUR_TOKEN' })
}