import { inject, injectable } from "tsyringe"
import { Request, Response } from 'express'
import { IAuthService } from "../interfaces/services/auth-service.interface"

@injectable()
class AuthController {
  constructor (
    @inject("AuthService")
    private authService: IAuthService
  ) { }

  login = async (request: Request, response: Response): Promise<void> => {

    const res = await this.authService.authenticate(request.body.username, request.body.password)

    response.status(200).send(res)
  }

}

export { AuthController }
