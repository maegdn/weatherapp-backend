function checkBody(body, parameters) {
    let isValid = true;

    for(const value of parameters) {
        if(!body[value] || body[value] === '')(
            isValid = false
        )

    }
    return isValid
}

module.exports = {checkBody};