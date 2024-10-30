import { container } from "tsyringe"
import "reflect-metadata"
import "../../shared/container/index"

//controllers
import { UserController } from "./user.controller"

export const userController = container.resolve(UserController)
