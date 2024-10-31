import { IUser } from "../entities/user.entity"
import { IUserDTO } from "../repositories/users-repository.interface"

export interface IUserService {
  create (data: IUserDTO): Promise<{
    id: string
  }>
  find (id: string): Promise<IUser | null>
}
