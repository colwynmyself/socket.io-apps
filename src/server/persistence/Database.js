const redis = require('redis')
const uuid = require('uuid')

module.exports = Debug => {
    const debug = Debug('socketapp:persistence:database')
    const redisUser = redis.createClient()

    // Redis event logging
    redisUser.on('warning', warning => {
        debug('redis warning', warning)
    })
    redisUser.on('ready', () => {
        debug('redis user ready')
    })
    redisUser.on('reconnecting', (delay, attempt) => {
        debug(`redis connection reconnecting. delay: ${delay}, attempt: ${attempt}`)
    })
    redisUser.on('error', error => {
        debug('redis error', error)
    })

    class User {
        constructor(data) {
            this.id = uuid.v4()
            this.data = data
        }
    }

    class UserList {
        constructor() {
            this.id = uuid.v4()
            this.users = []
            this.observers = []
        }

        addUser(data) {
            const user = new User(data)
            this.users.push(user)

            this.observers.filter(o => o.event === 'addUser').forEach(o => {
                o.callback(user)
            })
        }

        listAll() {
            return this.users
        }

        on(event, callback) {
            this.observers.push({
                event,
                callback,
            })
        }
    }

    return {
        User,
        UserList,
    }
}
