module.exports = (Debug, socketio, server) => {
    const debug = Debug('socketapps:socket')
    const io = socketio(server)
    debug('initializing socket.io connection')

    io.on('connection', socket => {
        debug('socket.io connection established')

        // Events
        socket.on('event', data => {
            debug(data)
        })
    })
}
