// Base server requirements
const express = require('express')
const chalk = require('chalk')
const path = require('path')
const socketio = require('socket.io')

// Server constructors
const Handlebars = require('express-handlebars')
const Debug = require('debug')

// Variables to be used in application
const debug = Debug('socketapps:main')
const port = process.env.PORT || 3000

// App initialization
const app = express()
const server = require('http').createServer(app)

// Handlebars and public files
app.engine('handlebars', Handlebars({
    defaultLayout: 'main',
    layoutsDir: path.resolve(__dirname, 'handlebars', 'layouts'),
    partialsDir: path.resolve(__dirname, 'handlebars', 'partials'),
}))
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, 'handlebars', 'views'))
app.use(express.static(path.resolve(__dirname, '..', 'public')))

// Require server files
require(path.resolve(__dirname, 'server', 'routes.js'))(Debug, app)
require(path.resolve(__dirname, 'server', 'socket.js'))(Debug, socketio, server)

// Start application
app.listen(port, () => {
    debug(`${chalk.blue.bold('Socket.IO')} running on port ${chalk.red.bold(port)}`)
})
