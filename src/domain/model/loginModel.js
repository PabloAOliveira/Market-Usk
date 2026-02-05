class LoginModel {
  constructor({
    email = '',
    password = '',
    showPassword = false
  } = {}) {
    this.email = email
    this.password = password
    this.showPassword = showPassword
  }

  clear() {
    this.email = ''
    this.password = ''
    this.showPassword = false
  }
}

export default LoginModel