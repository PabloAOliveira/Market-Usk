import { reactive } from 'vue'

const state = reactive({
  message: '',
  show: false,
  color: 'red',
  timeout: 3000,
  location: 'top right',
})

export const useSnackbar = () => {
  const show = (
    options = {
      message: '',
      color: 'red',
      timeout: 3000,
      location: 'top right',
    },
  ) => {
    state.message = options.message
    state.show = true
    state.color = options.color || 'red'
    state.timeout = options.timeout || 3000
    state.location = options.location || 'top right'

    setTimeout(() => {
      state.show = false
    }, state.timeout)
  }

  const close = () => {
    state.show = false
    state.message = ''
    state.location = 'top right'
  }

  return {
    state,
    show,
    close,
  }
}
