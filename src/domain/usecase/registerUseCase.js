const registerUseCase = (registerFirebaseAuthRepository) => {
  /**
   * Executa o caso de uso de registro
   * Valida os dados de entrada, cria o usuário no Firebase e atualiza o perfil com o nome
   * @param {string} name - Nome do usuário
   * @param {string} email - Email do usuário
   * @param {string} password - Senha do usuário
   * @returns {Promise<{success: boolean, user: Object | null, error: string | null}>}
   */
  const execute = async (name, email, password) => {
    // Validação de negócio: verifica se nome foi informado
    if (!name || !name.trim()) {
      return {
        success: false,
        user: null,
        error: 'Nome é obrigatório'
      }
    }

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

    // Validação de negócio: verifica tamanho mínimo do nome
    if (name.trim().length < 2) {
      return {
        success: false,
        user: null,
        error: 'Nome deve ter no mínimo 2 caracteres'
      }
    }

    try {
      // Normaliza o email removendo espaços e convertendo para minúsculas
      const normalizedEmail = email.trim().toLowerCase()
      const normalizedName = name.trim()

      // Chama o repository para criar o usuário no Firebase
      const userCredential = await registerFirebaseAuthRepository.createUser(
        normalizedEmail,
        password
      )

      // Atualiza o perfil do usuário com o nome
      await registerFirebaseAuthRepository.updateUserProfile(
        userCredential.user,
        normalizedName
      )

      // Mapeia o resultado do Firebase para o formato esperado pela aplicação
      const user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: normalizedName,
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
      'auth/email-already-in-use': 'Este email já está em uso',
      'auth/weak-password': 'Senha muito fraca',
      'auth/operation-not-allowed': 'Operação não permitida',
      'auth/network-request-failed': 'Erro de conexão. Verifique sua internet',
      'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde',
    }

    return errorMessages[errorCode] || error.message || 'Erro ao criar conta'
  }

  return {
    execute
  }
}

export default registerUseCase

