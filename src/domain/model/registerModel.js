class RegisterModel {
  constructor({
    name = '',
    email = '',
    password = '',
    confirmPassword = '',
    showPassword = false
  } = {}) {
    this.name = name
    this.email = email
    this.password = password
    this.confirmPassword = confirmPassword
    this.showPassword = showPassword
  }

  clear() {
    this.name = ''
    this.email = ''
    this.password = ''
    this.confirmPassword = ''
    this.showPassword = false
  }
}

export default RegisterModel

