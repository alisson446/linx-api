import { Router } from "express"
import { user } from "../routes/user.routes"
import { post } from "./post.routes"
import { auth } from "./auth.routes"

const router = Router()

router.use('/users', user)
router.use('/posts', post)
router.use('/auth', auth)

export { router }
