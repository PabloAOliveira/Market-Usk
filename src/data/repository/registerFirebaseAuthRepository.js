import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import firebaseApp from '@/firebase'

const registerFirebaseAuthRepository = () => {
  let auth = null

  /**
   * Obtém a instância de autenticação do Firebase
   * Inicialização lazy: só cria a instância quando necessário
   * @returns {Auth} Instância de autenticação do Firebase
   */
  const getAuthInstance = () => {
    if (!auth) {
      auth = getAuth(firebaseApp)
    }
    return auth
  }

  /**
   * Cria um novo usuário com email e senha no Firebase
   * @param {string} email - Email do usuário
   * @param {string} password - Senha do usuário
   * @returns {Promise<UserCredential>} Credencial do usuário criado
   * @throws {Error} Erro ao criar usuário no Firebase
   */
  const createUser = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(
      getAuthInstance(),
      email,
      password
    )

    return userCredential
  }

  /**
   * Atualiza o perfil do usuário com o nome
   * @param {Object} user - Objeto do usuário do Firebase
   * @param {string} displayName - Nome do usuário
   * @returns {Promise<void>}
   * @throws {Error} Erro ao atualizar perfil
   */
  const updateUserProfile = async (user, displayName) => {
    await updateProfile(user, {
      displayName: displayName
    })
  }

  return {
    createUser,
    updateUserProfile
  }
}

export default registerFirebaseAuthRepository

