import { ref } from "vue"
import { useRouter } from 'vue-router'
import { useSnackbar } from '@/composables/useSnackbar'

const marketController = ({ loginUseCase, logoutUseCase }) => () => {
  const snackbar = useSnackbar()
  const showPassword = ref(false)
  const password = ref('')
  const email = ref('')
  const router = useRouter()
  const regras = {
    required: (v) => !!v || 'Preencha o campo.',
    validEmail: (v) => !v || /.+@.+\..+/.test(v) || 'Informe um e-mail válido.',
  }
  const formRef = ref(null)
  const nameRegister = ref('')
  const emailRegister = ref('')
  const passwordRegister = ref('')

  const login = async () => {
    try {
      const isFormValid = await validateForm()
      if (!isFormValid) return

      const result = await loginUseCase.execute(email.value, password.value)

      if (result.success) {
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
        message: error.message || 'Erro ao fazer logout',
        color: 'error'
      })
    }
  }

  const validateForm = async () => {
    const { valid } = await formRef.value.validate()
    return valid
  }


  return {
    snackbar,
    showPassword,
    password,
    email,
    regras,
    formRef,
    nameRegister,
    emailRegister,
    passwordRegister,
    login,
    logout,
    goToLogin,
    goToRegister,
  }
}

export default marketController