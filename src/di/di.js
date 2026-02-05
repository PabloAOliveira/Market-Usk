import marketController from '../controller/marketController'
import loginFirebaseAuthRepository from '../data/repository/loginFirebaseAuthRepository'
import loginUseCase from '../domain/usecase/loginUseCase'
import logoutUseCase from '../domain/usecase/logoutUseCase'

const loginRepository = loginFirebaseAuthRepository()

const loginUseCaseInstance = loginUseCase(loginRepository)
const logoutUseCaseInstance = logoutUseCase(loginRepository)

export const marketControllerImpl = marketController({
  loginUseCase: loginUseCaseInstance,
  logoutUseCase: logoutUseCaseInstance
})