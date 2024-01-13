const bourne = require('@hapi/bourne')
const bodyParser = require('body-parser')

const scan = (object) => bourne.scan(object)
const parse = (string) => bourne.parse(string)

module.exports = function(app) {
    app.use(bodyParser.urlencoded())
    app.use(bodyParser.json())
    app.use(bodyParser.text())
    app.use((request, response, next) => {
        try {
            if (request.body) {
                request.body = (typeof request.body == 'string') ? parse(request.body) : request.body
                scan(request.body)
            }
            next()
        } catch(_) {
            response.status(400)
            response.end('You\'re trying to pollute the environment, but I like the way you think :)')
        }
    })
}
