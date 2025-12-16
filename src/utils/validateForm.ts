export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

export const validatePassword = (password: string): boolean => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password)
}

export const validateRequired = (value: any): boolean => {
    return value && value.toString().trim().length > 0
}

export const validateMinLength = (value: any, minLength: number): boolean => {
    return value && value.toString().length >= minLength
}

export const validateMaxLength = (value: any, maxLength: number): boolean => {
    return !value || value.toString().length <= maxLength
}

export const validatePrice = (price: string | number): boolean => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return !isNaN(numPrice) && numPrice >= 0
}

export const validateUrl = (url: string): boolean => {
    try {
        new URL(url)
        return true
    } catch {
        return false
    }
}
