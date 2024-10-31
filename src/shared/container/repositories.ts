import { container } from "tsyringe"
import "reflect-metadata"

//repositories
import { UserRepository } from '../../app/repositories/user.repository'
import { PostRepository } from "../../app/repositories/post.repository"

//interfaces
import { IUserRepository } from "../../app/interfaces/repositories/users-repository.interface"
import { IPostRepository } from "../../app/interfaces/repositories/post-repository.interface"


container.registerSingleton<IUserRepository>(
  "UserRepository",
  UserRepository
)

container.registerSingleton<IPostRepository>(
  "PostRepository",
  PostRepository
)
