const express = require('express')

module.exports = function(app) {
    app.use(express.static('./app/static', { index: 'index.htm' }))
}
