import { IPost } from "./post.entity"

export interface IUsuario {
  id: string
  nome: string
  email: string
  username: string
  password: string
  salt: string | null
  createdAt: Date
  updatedAt: Date
  Post?: IPost[]
}