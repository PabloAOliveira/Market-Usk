import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import firebaseApp from '@/firebase'

const loginFirebaseAuthRepository = () => {
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
   * Realiza login com email e senha no Firebase
   * @param {string} email - Email do usuário
   * @param {string} password - Senha do usuário
   * @returns {Promise<UserCredential>} Credencial do usuário autenticado
   * @throws {Error} Erro de autenticação do Firebase
   */
  const signIn = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      getAuthInstance(),
      email,
      password
    )

    return userCredential
  }

  /**
   * Realiza logout do usuário atual
   * @returns {Promise<void>}
   * @throws {Error} Erro ao fazer logout
   */
  const signOutUser = async () => {
    await signOut(getAuthInstance())
  }

  /**
   * Obtém o usuário atualmente autenticado
   * @returns {Object | null} Dados do usuário autenticado ou null se não houver usuário logado
   */
  const getCurrentUser = () => {
    const authInstance = getAuthInstance()
    const user = authInstance.currentUser

    if (!user) return null

    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified
    }
  }

  return {
    signIn,
    signOut: signOutUser,
    getCurrentUser
  }
}

export default loginFirebaseAuthRepository

