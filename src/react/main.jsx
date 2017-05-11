import React from 'react'
import { render } from 'react-dom'
import io from 'socket.io-client'

class App extends React.Component {
    constructor() {
        super()

        this.state = {}

        this.handleClick = () => {
            if (this.state.socket) this.state.socket.emit('event', 'hey')
        }

        const socket = io(window.location.pathname)
        socket.on('connect', () => {
            console.log('Socket.IO connected')
            this.setState({ socket })
        })
        socket.on('event', data => {
            console.log(data)
        })
        socket.on('disconnect', () => {
            console.log('Socket.IO disconnected')
            this.setState({ socket: null })
        })
    }
    render() {
        return (<div>
            <h1>Socket.IO!</h1>
            <button onClick={this.handleClick}>Click me!</button>
        </div>)
    }
}

render(<App />, document.getElementById('app'))
