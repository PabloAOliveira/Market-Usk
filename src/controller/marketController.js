import { ref } from "vue"
import { useRouter } from 'vue-router'
import { useSnackbar } from '@/composables/useSnackbar'
import LoginModel from '@/domain/model/loginModel'
import RegisterModel from '@/domain/model/registerModel'

const marketController = ({ loginUseCase, registerUseCase, logoutUseCase }) => () => {
  const snackbar = useSnackbar()
  const loginModel = ref(new LoginModel())
  const registerModel = ref(new RegisterModel())
  const router = useRouter()
  const regras = {
    required: (v) => !!v || 'Preencha o campo.',
    validEmail: (v) => !v || /.+@.+\..+/.test(v) || 'Informe um e-mail válido.',
    passwordsMatch: (v) => {
      if (!v) return 'Confirme sua senha'
      return v === registerModel.value.confirmPassword || 'As senhas não coincidem'
    }
  }
  const formRef = ref(null)
  const carregandoLogin = ref(false)
  const carregandoRegister = ref(false)

  const login = async () => {
    try {
      const isFormValid = await validateForm()
      if (!isFormValid) return

      carregandoLogin.value = true

      const result = await loginUseCase.execute(loginModel.value.email, loginModel.value.password)

      if (result.success) {
        loginModel.value.clear()
        router.push('/home')
      } else {
        snackbar.show({
          message: result.error,
          color: 'error'
        })
      }
    } catch (error) {
      snackbar.show({
        message: error.message,
        color: 'error'
      })
    } finally {
      carregandoLogin.value = false
    }
  }

  const goToLogin = () => {
    router.push('/login')
  }

  const goToRegister = () => {
    router.push('/register')
  }

  const logout = async () => {
    try {
      const result = await logoutUseCase.execute()

      if (result.success) {
        router.push('/login')
      } else {
        snackbar.show({
          message: result.error,
          color: 'error'
        })
      }
    } catch (error) {
      snackbar.show({
        message: error.message,
        color: 'error'
      })
    }
  }

  const registerUser = async () => {
    try {
      const isFormValid = await validateForm()
      if (!isFormValid) return

      carregandoRegister.value = true

      const result = await registerUseCase.execute(
        registerModel.value.name,
        registerModel.value.email,
        registerModel.value.password
      )

      if (result.success) {
        registerModel.value.clear()
        snackbar.show({
          message: 'Conta criada com sucesso!',
          color: 'success'
        })
        router.push('/home')
      } else {
        snackbar.show({
          message: result.error,
          color: 'error'
        })
      }
    } catch (error) {
      snackbar.show({
        message: error.message,
        color: 'error'
      })
    } finally {
      carregandoRegister.value = false
    }
  }

  const validateForm = async () => {
    const { valid } = await formRef.value.validate()
    return valid
  }


  return {
    snackbar,
    loginModel,
    registerModel,
    regras,
    formRef,
    carregandoLogin,
    carregandoRegister,
    login,
    registerUser,
    logout,
    goToLogin,
    goToRegister,
  }
}

export default marketController