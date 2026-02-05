const loginUseCase = (loginFirebaseAuthRepository) => {
  /**
   * Valida os dados de entrada, realiza a autenticação e retorna o resultado
   * @param {string} email - Email do usuário
   * @param {string} password - Senha do usuário
   * @returns {Promise<{success: boolean, user: Object | null, error: string | null}>}
   */
  const execute = async (email, password) => {
    // Validação de negócio: verifica se email foi informado
    if (!email || !email.trim()) {
      return {
        success: false,
        user: null,
        error: 'Email é obrigatório'
      }
    }

    // Validação de negócio: verifica se senha foi informada
    if (!password || !password.trim()) {
      return {
        success: false,
        user: null,
        error: 'Senha é obrigatória'
      }
    }

    // Validação de negócio: verifica formato válido de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return {
        success: false,
        user: null,
        error: 'Email inválido'
      }
    }

    // Validação de negócio: verifica tamanho mínimo da senha
    if (password.length < 6) {
      return {
        success: false,
        user: null,
        error: 'Senha deve ter no mínimo 6 caracteres'
      }
    }

    try {
      // Normaliza o email removendo espaços e convertendo para minúsculas
      const normalizedEmail = email.trim().toLowerCase()

      // Chama o repository para realizar a autenticação no Firebase
      const userCredential = await loginFirebaseAuthRepository.signIn(
        normalizedEmail,
        password
      )

      // Mapeia o resultado do Firebase para o formato esperado pela aplicação
      const user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        emailVerified: userCredential.user.emailVerified
      }

      return {
        success: true,
        user,
        error: null
      }
    } catch (error) {
      // Converte erros do Firebase em mensagens amigáveis ao usuário
      const errorMessage = mapFirebaseError(error)

      return {
        success: false,
        user: null,
        error: errorMessage
      }
    }
  }

  /**
   * Converte códigos de erro do Firebase em mensagens amigáveis em português
   * @param {Error} error - Erro lançado pelo Firebase
   * @returns {string} Mensagem de erro traduzida e amigável
   */
  const mapFirebaseError = (error) => {
    const errorCode = error.code
    const errorMessages = {
      'auth/invalid-email': 'Email inválido',
      'auth/user-disabled': 'Esta conta foi desabilitada',
      'auth/user-not-found': 'Usuário não encontrado',
      'auth/wrong-password': 'Senha incorreta',
      'auth/invalid-credential': 'Credenciais inválidas',
      'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde',
      'auth/network-request-failed': 'Erro de conexão. Verifique sua internet',
      'auth/operation-not-allowed': 'Operação não permitida',
    }

    return errorMessages[errorCode] || error.message || 'Erro ao realizar login'
  }

  return {
    execute
  }
}

export default loginUseCase

