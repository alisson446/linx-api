import { Router } from "express"
import { usuario } from "../routes/usuario.routes"

const router = Router()

router.use('/usuarios', usuario)

export { router }
