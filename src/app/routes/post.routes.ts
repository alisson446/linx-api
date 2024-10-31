import { Router } from "express"
import { postController } from "../controllers"

const post = Router()

post.get('/', postController.index)
post.post('/', postController.create)
post.get('/:id', postController.find)
post.put('/:id', postController.update)
post.delete('/:id', postController.delete)

export { post }
