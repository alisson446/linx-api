import { Router } from "express"
import { userController } from "../controllers"

const user = Router()

user.post('/', userController.create)
user.get('/:id', userController.find)

export { user }
