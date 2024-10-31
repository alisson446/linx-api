import { inject, injectable } from "tsyringe"
import { Request, Response } from 'express'
import { IUserService } from "../interfaces/services/user-service.interface"

@injectable()
class UserController {
  constructor (
    @inject("UserService")
    private userService: IUserService
  ) { }

  create = async (request: Request, response: Response): Promise<void> => {

    const res = await this.userService.create(request.body)

    response.status(200).send(res)
  }

  find = async (request: Request, response: Response): Promise<void> => {

    const res = await this.userService.find(request.params.id)

    response.status(200).send(res)
  }

}

export { UserController }
