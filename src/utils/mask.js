export const format = (mask, value) => {
	const letters = /[^\sA-zÀ-ú]+/g
    const digits = /[^0-9]+/g
    let digitsValue = value.replace(digits, '')

    switch (mask) {
        case 'alphabet':
            return value.replace(letters, '')
        case 'digits':
            return digitsValue
        case 'digits-3':
            if (digitsValue.length > 3) {
                digitsValue = digitsValue.slice(0, 3)
            }
            return digitsValue
        case 'digits-5':
            if (digitsValue.length > 5) {
                digitsValue = digitsValue.slice(0, 5)
            }
            return digitsValue
        case 'date':
            if (digitsValue.length > 8) {
                digitsValue = digitsValue.slice(0, 8)
            }
            if (digitsValue.length >= 5) {
                digitsValue = `${digitsValue.slice(0,2)}/${digitsValue.slice(2,4)}/${digitsValue.slice(4)}`
            } else if (digitsValue.length >= 3) {
                digitsValue = `${digitsValue.slice(0,2)}/${digitsValue.slice(2)}`
            }
            return digitsValue
        case 'dd/mm':
            if (digitsValue.length > 4) {
                digitsValue = digitsValue.slice(0, 4)
            }
            if (digitsValue.length >= 3) {
                digitsValue = `${digitsValue.slice(0,2)}/${digitsValue.slice(2)}`
            }
            return digitsValue
        case 'cvv':
            if (digitsValue.length > 3) {
                digitsValue = digitsValue.slice(0, 3)
            }
            return digitsValue
        case 'card':
            if (digitsValue.length > 16) {
                digitsValue = digitsValue.slice(0, 16)
            }
            if (digitsValue.length >= 13) {
                digitsValue = `${digitsValue.slice(0,4)}.${digitsValue.slice(4,8)}.${digitsValue.slice(8, 12)}.${digitsValue.slice(12)}`
            } else if (digitsValue.length >= 9) {
                digitsValue = `${digitsValue.slice(0,4)}.${digitsValue.slice(4,8)}.${digitsValue.slice(8)}`
            } else if (digitsValue.length >= 5) {
                digitsValue = `${digitsValue.slice(0,4)}.${digitsValue.slice(4)}`
            }
            return digitsValue
        case 'cpf':
            if (digitsValue.length > 11) {
                digitsValue = digitsValue.slice(0, 11)
            }
            if (digitsValue.length >= 10) {
                digitsValue = `${digitsValue.slice(0,3)}.${digitsValue.slice(3,6)}.${digitsValue.slice(6,9)}-${digitsValue.slice(9)}`
            } else if (digitsValue.length >= 7) {
                digitsValue = `${digitsValue.slice(0,3)}.${digitsValue.slice(3,6)}.${digitsValue.slice(6)}`
            } else if (digitsValue.length >= 4) {
                digitsValue = `${digitsValue.slice(0,3)}.${digitsValue.slice(3)}`
            }
            return digitsValue
        case 'cellphone':
            if (digitsValue.length > 10) {
                digitsValue = digitsValue.slice(0, 10)
            }
            if (digitsValue.length >= 7) {
                digitsValue = `(${digitsValue.slice(0,2)})${digitsValue.slice(2,6)}-${digitsValue.slice(6)}`
            } else if (digitsValue.length >= 3) {
                digitsValue = `(${digitsValue.slice(0,2)})${digitsValue.slice(2)}`
            }
            return digitsValue
        case 'phone':
            if (digitsValue.length > 11) {
                digitsValue = digitsValue.slice(0, 11)
            }
            if (digitsValue.length >= 8) {
                digitsValue = `(${digitsValue.slice(0,2)})${digitsValue.slice(2,7)}-${digitsValue.slice(7)}`
            } else if (digitsValue.length >= 3) {
                digitsValue = `(${digitsValue.slice(0,2)})${digitsValue.slice(2)}`
            }
            return digitsValue
        case 'cep':
            if (digitsValue.length > 8) {
                digitsValue = digitsValue.slice(0, 8)
            }
            if (digitsValue.length >= 6) {
                digitsValue = `${digitsValue.slice(0,5)}-${digitsValue.slice(5)}`
            }
            return digitsValue
        case 'cnpj':
            if (digitsValue.length > 14) {
                digitsValue = digitsValue.slice(0, 14)
            }
            if (digitsValue.length >= 13) {
                digitsValue = `${digitsValue.slice(0,2)}.${digitsValue.slice(2,5)}.${digitsValue.slice(5,8)}/${digitsValue.slice(8,12)}-${digitsValue.slice(12)}`
            } else if (digitsValue.length >= 9) {
                digitsValue = `${digitsValue.slice(0,2)}.${digitsValue.slice(2,5)}.${digitsValue.slice(5,8)}/${digitsValue.slice(8)}`
            } else if (digitsValue.length >= 6) {
                digitsValue = `${digitsValue.slice(0,2)}.${digitsValue.slice(2,5)}.${digitsValue.slice(5)}`
            } else if (digitsValue.length >= 3) {
                digitsValue = `${digitsValue.slice(0,2)}.${digitsValue.slice(2)}`
            }
            return digitsValue
        default:
            return value
    }
}