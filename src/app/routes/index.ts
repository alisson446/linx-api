import { Router } from "express"
import { user } from "../routes/user.routes"

const router = Router()

router.use('/users', user)

export { router }
