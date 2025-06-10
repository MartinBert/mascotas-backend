function round (valueToRound, decimals = 2) {
    let numberValue = parseFloat(valueToRound)
    if (isNaN(numberValue)) {
        return valueToRound
        // errorAlert('Error al redondear valor numérico. Contacte a su proveedor de sistema.')
        // throw Error(`Function 'round': Value can't be converted to numeric.`)
    }
    let signo = (numberValue >= 0 ? 1 : -1)
    numberValue = numberValue * signo
    if (decimals === 0) //with 0 decimals
        return signo * Math.round(numberValue)
    // round(x * 10 ^ decimals)
    numberValue = numberValue.toString().split('e')
    numberValue = Math.round(+(numberValue[0] + 'e' + (numberValue[1] ? (+numberValue[1] + decimals) : decimals)))
    // x * 10 ^ (-decimals)
    numberValue = numberValue.toString().split('e')
    const roundedValue = signo * (numberValue[0] + 'e' + (numberValue[1] ? (+numberValue[1] - decimals) : -decimals))
    return roundedValue
}

const mathHelper = {
    round
}

module.exports = mathHelper