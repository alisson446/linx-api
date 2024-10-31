import { Warning } from '../errors'
import { IUserDTO, IUserRepository } from '../interfaces/repositories/users-repository.interface'
import { IUserService } from '../interfaces/services/user-service.interface'
import { inject, injectable } from "tsyringe"

@injectable()
class UserService implements IUserService {
  constructor (
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) { }

  async create (data: IUserDTO) {
    return await this.userRepository.create(data)
  }

  async find (userId: string) {
    const user = await this.userRepository.find(userId)

    if (!user) {
      throw new Warning("Usuário não encontrado", 400)
    }

    return user
  }
}

export { UserService }