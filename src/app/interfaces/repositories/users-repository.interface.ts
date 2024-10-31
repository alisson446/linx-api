import { IUser } from "../entities/user.entity"

export interface IUserRepository {
  create (data: IUserDTO): Promise<{
    id: string
  }>
  find (id: string): Promise<IUser | null>
  findByUserName (username: string): Promise<IUser | null>
}


export interface IUserDTO {
  name: string
  email: string
  username: string
  password: string
}
