import { IPost } from "./post.entity"

export interface IUser {
  id: string
  name: string
  email: string
  username: string
  password: string
  salt: string | null
  createdAt: Date
  updatedAt: Date
  Posts?: IPost[]
}