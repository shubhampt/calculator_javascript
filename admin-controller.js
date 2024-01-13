const { readTemplate, logCustomHeaders } = require('../service/admin-service.js')

module.exports = function(app) {
    app.get('/health', (_, response) => {
        response.json({
            status: 'up'
        })
    })

    app.get('/syslog', (request, response) => {
        if (request.isAdmin == true) {
            const { headers } = request
            logCustomHeaders(headers)
            response.type('text/plain')
            response.send(readTemplate('syslog.log'))
        } else {
            response.status(401)
            response.json({
                'message': 'Unauthorized access'
            })
        }
    })
}
