const express = require('express')
const app = express()

require('./app/middleware/admin-middleware.js')(app)
require('./app/middleware/parser-middleware.js')(app)
require('./app/controller/admin-controller.js')(app)
require('./app/controller/calculator-controller.js')(app)
require('./app/controller/static-controller.js')(app)

app.listen(9900)
