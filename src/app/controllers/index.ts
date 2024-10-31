import { container } from "tsyringe"
import "reflect-metadata"
import "../../shared/container/index"

//controllers
import { UserController } from "./user.controller"
import { PostController } from "./post.controller"
import { AuthController } from "./auth.controller"

export const userController = container.resolve(UserController)
export const postController = container.resolve(PostController)
export const authController = container.resolve(AuthController)
