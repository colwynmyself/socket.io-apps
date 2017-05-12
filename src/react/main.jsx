import React from 'react'
import { render } from 'react-dom'
import io from 'socket.io-client'

import ClientList from './components/ClientList.jsx'

class App extends React.Component {
    constructor() {
        super()

        this.state = {
            clients: [],
        }

        this.handleClick = () => {
            if (!this.state.socket) return

            this.state.socket.emit('join', {
                name: 'Somebody',
            })
        }

        const socket = io(window.location.pathname)

        socket.on('connect', () => {
            this.setState({ socket })
        })
        socket.on('disconnect', () => {
            this.setState({ socket: null })
        })

        socket.on('listClients', clients => {
            this.setState({
                clients,
            })
        })
        socket.on('addClient', client => {
            this.setState(lastState => Object.assign({}, lastState, {
                clients: lastState.clients.concat(client),
            }))
        })
    }
    render() {
        return (<div>
            <h1>Socket.IO!</h1>
            <button onClick={this.handleClick}>Click me!</button>
            <ClientList clients={this.state.clients} />
        </div>)
    }
}

render(<App />, document.getElementById('app'))
