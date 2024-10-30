import { Router } from "express"
import { userController } from "../controllers"

const user = Router()

user.post('/create', userController.create)
user.get('/find/:id', userController.find)
user.post('/login', userController.login)
user.post('/auth', userController.auth)

export { user }
