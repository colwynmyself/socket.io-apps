module.exports = (Debug, io, db) => {
    const debug = Debug('socketapps:socket')

    debug('initializing socket.io')
    const clientList = new db.ClientList()

    io.on('connection', socket => {
        debug('socket.io connection established')

        // Events
        socket.on('join', data => {
            clientList.addClient(data)
            io.emit('listClients', clientList.listAll())
        })

        clientList.on('addClient', client => {
            io.emit('addClient', client)
        })
    })
}
