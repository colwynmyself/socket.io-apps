module.exports = (Debug, app) => {
    const debug = Debug('socketapps:routes')
    debug('initializing routes')

    app.get('/', (req, res) => {
        res.render('home')
    })
}
