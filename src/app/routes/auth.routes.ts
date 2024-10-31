import { Router } from "express"
import { authController } from "../controllers"

const auth = Router()

auth.post('/login', authController.login)

export { auth }
