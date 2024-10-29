import { Router } from "express"
import { usuarioController } from "../controllers"

const usuario = Router()

usuario.post('/create', usuarioController.create)
usuario.post('/login', usuarioController.login)
usuario.post('/auth', usuarioController.auth)

export { usuario }
