const handlebars = require("handlebars");
const fs = require('fs')

handlebars.registerHelper('loadFile', function(fileName) {
    return new handlebars.SafeString(fs.readFileSync(fileName))
})

const resetTemplate = () => {
    let initText = 'Welcome to Calculator System Log\n'
    initText += 'Current System Time: {{currentDateTime}}\n'
    initText += '-----------------------------------------'
    fs.writeFileSync('./syslog.log', initText)
}
const loadTemplateFromFile = handlebars.compile('{{loadFile ./fileName}}')
const readTemplate = fileName => {
    try {
        return handlebars.compile(loadTemplateFromFile({ fileName }))({
            currentDateTime: new Date().toString()
        })
    } catch(_) {
        resetTemplate()
    }
}
const logCustomHeaders = headers => {
    let customHeaders = []
    Object.keys(headers).map(key => {
        if (key.toLowerCase().startsWith('x-calc-')) {
            customHeaders.push('Header ' + key + '=' + headers[key])
        }
    })
    if (customHeaders.length > 0) {
        fs.appendFileSync('./syslog.log', '\nAccessed syslogs with custom headers ' + JSON.stringify(customHeaders))
    }
}
const log = (line, object) => {
    fs.appendFileSync('./syslog.log', '\n' + line + ': ' + JSON.stringify(object))
}

module.exports = {
    readTemplate,
    logCustomHeaders,
    log
}

resetTemplate()
