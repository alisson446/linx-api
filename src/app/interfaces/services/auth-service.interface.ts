import { IUser } from "../entities/user.entity"

export interface IAuthService {
  authenticate (username: string, password: string): Promise<{
    userId: string,
    token: string
  } | null>
  verifyToken (token: string): Promise<IVerifyTokenResponse | null>
}


export interface IVerifyTokenResponse {
  id: string
  user: IUser
}
