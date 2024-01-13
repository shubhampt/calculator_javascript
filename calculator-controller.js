const { addObjectValues } = require('../service/calculator-service.js')

module.exports = function(app) {
    app.get('/sum', (request, response) => {
        const { query } = request
        response.json({
            sum: addObjectValues(query)
        })
    })

    app.post('/sum', (request, response) => {
        const body = request.body
        response.json({
            sum: addObjectValues(body)
        })
    })
}
