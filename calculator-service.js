const { log } = require('./admin-service.js')
const { extractOperands } = require('../util/extract.js')

const recursiveSum = object => {
    let sum = 0
    Object.values(object).map(value => {
        sum += (typeof value == 'number') ? value : recursiveSum(value)
    })
    return sum
}

module.exports = {
    addObjectValues: object => {
        const extractedObject = extractOperands(object)
        log('Sum calculated for', extractedObject)
        return recursiveSum(extractedObject)
    }
}
