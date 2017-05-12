// Base server requirements
const express = require('express')
const chalk = require('chalk')
const path = require('path')
const socketio = require('socket.io')
const http = require('http')

// Server constructors
const Handlebars = require('express-handlebars')
const DebugPackage = require('debug')

// Wrapping debug in our own handler to append date on all statements
const Debug = name => {
    const d = DebugPackage(name)
    return statement => {
        const date = new Date()
        d(date, statement)
    }
}

// Variables to be used in application
const debug = Debug('socketapps:main')
const port = process.env.PORT || 3000

// App initialization
const app = express()
const server = http.createServer(app)
const io = socketio.listen(server)

// Persistence layer
const database = require(path.resolve(__dirname, 'persistence', 'Database.js'))(Debug)

// Handlebars and public files
app.engine('handlebars', Handlebars({
    defaultLayout: 'main',
    layoutsDir: path.resolve(__dirname, 'handlebars', 'layouts'),
    partialsDir: path.resolve(__dirname, 'handlebars', 'partials'),
}))
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, 'handlebars', 'views'))
app.use(express.static(path.resolve(__dirname, '..', '..', 'public')))

// Require server files
require(path.resolve(__dirname, 'routes.js'))(Debug, app)
require(path.resolve(__dirname, 'socket.js'))(Debug, io, database)

// Start application
server.listen(port, () => {
    debug(`${chalk.blue.bold('Socket.IO')} running on port ${chalk.red.bold(port)}`)
})
