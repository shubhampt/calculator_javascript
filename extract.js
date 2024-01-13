const isFunctionOrObject = subject => typeof subject == 'function' || typeof subject == 'object'

const structureAsNativeObject = object => {
    Object.keys(object).map(key => {
        const value = object[key]
        const partKeys = key.split('.')
        let currentObject = object
        for (let count = 0; count < partKeys.length - 1; count++) {
            const partKey = partKeys[count]
            if (!isFunctionOrObject(currentObject[partKey])) {
                currentObject[partKey] = {}
            }
            currentObject = currentObject[partKey]
        }
        delete object[key]
        currentObject[partKeys[partKeys.length - 1]] = value
    })
}

const filterAndExtractObject = (target, source, filter) => {
    filter = (!filter || typeof filter != 'function') ? () => true : filter
    source = (!source || typeof source != 'object') ? {} : source
    target = (!target || typeof target != 'object') ? {} : target
    Object.keys(source).map(key => {
        if (isFunctionOrObject(source[key])) {
            if (!isFunctionOrObject(target[key])) target[key] = {}
            filterAndExtractObject(target[key], source[key], filter)
        } else if (filter(key, source[key])) {
            target[key] = source[key]
        }
    })
}

const extractOperands = (object) => {
    let extracted = {}
    filterAndExtractObject(extracted, object, (_, value) => !isNaN(parseFloat(value)))
    structureAsNativeObject(extracted)
    Object.keys(extracted).map(key => {
        if (typeof extracted[key] == 'function' || typeof extracted[key] == 'object') {
            extracted[key] = extractOperands(extracted[key])
        } else {
            extracted[key] = parseFloat(extracted[key])
        }
    })
    return extracted
}

module.exports = {
    extractOperands
}
