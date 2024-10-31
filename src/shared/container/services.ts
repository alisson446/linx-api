import { container } from "tsyringe"
import "reflect-metadata"

//services
import { AuthService } from "../../app/services/auth.service"
import { UserService } from "../../app/services/user.service"
import { PostService } from "../../app/services/post.service"

//interfaces
import { IAuthService } from "../../app/interfaces/services//auth-service.interface"
import { IUserService } from "../../app/interfaces/services/user-service.interface"
import { IPostService } from "../../app/interfaces/services/post-service.interface"


container.registerSingleton<IAuthService>(
  "AuthService",
  AuthService
)

container.registerSingleton<IUserService>(
  "UserService",
  UserService
)

container.registerSingleton<IPostService>(
  "PostService",
  PostService
)
