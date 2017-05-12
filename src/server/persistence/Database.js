const redis = require('redis')
const uuid = require('uuid')

module.exports = Debug => {
    const debug = Debug('socketapp:persistence:database')
    const redisClient = redis.createClient()

    // Redis event logging
    redisClient.on('warning', warning => {
        debug('redis warning', warning)
    })
    redisClient.on('ready', () => {
        debug('redis client ready')
    })
    redisClient.on('reconnecting', (delay, attempt) => {
        debug(`redis connection reconnecting. delay: ${delay}, attempt: ${attempt}`)
    })
    redisClient.on('error', error => {
        debug('redis error', error)
    })

    class Client {
        constructor(data) {
            this.data = data
            this.id = uuid.v4()
        }
    }

    class ClientList {
        constructor() {
            this.clients = []
            this.observers = []
        }

        addClient(data) {
            const client = new Client(data)
            this.clients.push(client)

            this.observers.filter(o => o.event === 'addClient').forEach(o => {
                o.callback(client)
            })
        }

        listAll() {
            return this.clients
        }

        on(event, callback) {
            this.observers.push({
                event,
                callback,
            })
        }
    }

    return {
        Client,
        ClientList,
    }
}
