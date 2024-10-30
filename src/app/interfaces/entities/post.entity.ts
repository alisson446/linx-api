import { IUser } from "./user.entity"

export interface IPost {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
  userId: string
  User?: IUser
}