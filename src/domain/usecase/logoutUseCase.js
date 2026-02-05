const logoutUseCase = (loginFirebaseAuthRepository) => {
  /**
   * Executa o caso de uso de logout
   * Realiza o logout do usuário autenticado
   * @returns {Promise<{success: boolean, error: string | null}>}
   */
  const execute = async () => {
    try {
      await loginFirebaseAuthRepository.signOut()
      
      return {
        success: true,
        error: null
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Erro ao fazer logout'
      }
    }
  }

  return {
    execute
  }
}

export default logoutUseCase

