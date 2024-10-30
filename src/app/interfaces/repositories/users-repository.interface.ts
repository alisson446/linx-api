import { IUser } from "../entities/user.entity"

export interface IUserRepository {
  create (data: IUserDTO): Promise<string>
  find (id: string): Promise<IUser | null>
  login (username: string, password: string): Promise<IUser>
}


export interface IUserDTO {
  name: string
  email: string
  username: string
  password: string
}
