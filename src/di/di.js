import marketController from '../controller/marketController'
import loginFirebaseAuthRepository from '../data/repository/loginFirebaseAuthRepository'
import registerFirebaseAuthRepository from '../data/repository/registerFirebaseAuthRepository'
import loginUseCase from '../domain/usecase/loginUseCase'
import registerUseCase from '../domain/usecase/registerUseCase'
import logoutUseCase from '../domain/usecase/logoutUseCase'

const loginRepository = loginFirebaseAuthRepository()
const registerRepository = registerFirebaseAuthRepository()

const loginUseCaseInstance = loginUseCase(loginRepository)
const registerUseCaseInstance = registerUseCase(registerRepository)
const logoutUseCaseInstance = logoutUseCase(loginRepository)

export const marketControllerImpl = marketController({
  loginUseCase: loginUseCaseInstance,
  registerUseCase: registerUseCaseInstance,
  logoutUseCase: logoutUseCaseInstance
})