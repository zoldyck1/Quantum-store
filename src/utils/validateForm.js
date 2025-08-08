export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
  return passwordRegex.test(password)
}

export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0
}

export const validateMinLength = (value, minLength) => {
  return value && value.toString().length >= minLength
}

export const validateMaxLength = (value, maxLength) => {
  return !value || value.toString().length <= maxLength
}

export const validatePrice = (price) => {
  const numPrice = parseFloat(price)
  return !isNaN(numPrice) && numPrice >= 0
}

export const validateUrl = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}