import { container } from "tsyringe"
import "reflect-metadata"

//repositories
import { UserRepository } from '../../app/repositories/user.repository'

//interfaces
import { IUserRepository } from "../../app/interfaces/repositories/users-repository.interface"


container.registerSingleton<IUserRepository>(
  "UserRepository",
  UserRepository
)
