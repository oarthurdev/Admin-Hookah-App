import axios from 'axios'
import { Notify } from 'quasar'

const API_URL = 'http://localhost:8080/api/auth/'

class AuthService {
  login(user) {
    const self = this
    return axios
      .post(API_URL + 'login', {
        email: user.email,
        password: user.password,
        captcha: document.querySelector('#g-recaptcha-response').value
      })
      .then(response => {
        return response.data
      })
  }

  logout() {
    localStorage.clear()
    location.href = '/'
  }

  register(user) {
    const self = this
    return axios.post(API_URL + 'register', {
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
      rpassword: user.repeatPassword
    }).then(response => {
      if (response.data.emailExist) {
        Notify.create({
          color: 'negative',
          message: '<b>' + user.email + '</b> has already registered.',
          html: true
        })
        return false
      } else if (response.data.diffPass) {
        Notify.create({
          color: 'negative',
          message: 'Passwords entered does not match.'
        })
      } else if (response.data.empty) {
        Notify.create({
          color: 'negative',
          message: 'The form cannot contain empty fields.'
        })
      } else {
        Notify.create({
          color: 'positive',
          message: '<b>' + user.email + '</b> has registered successfully.',
          html: true
        })
      }

      return response.data
    })
  }
}

export default new AuthService()
