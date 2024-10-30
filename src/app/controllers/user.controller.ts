import { UserRepository } from '../repositories/user.repository'
import { inject, injectable } from "tsyringe"
import { Request, Response } from 'express'
import { AuthService } from '../services/auth.service'

@injectable()
class UserController {
  constructor (
    @inject("UserRepository")
    private userRepository: UserRepository,
    private authService: AuthService = new AuthService(userRepository)
  ) { }

  create = async (request: Request, response: Response): Promise<void> => {

    const res = await this.userRepository.create(request.body)

    response.status(200).send(res)
  }

  find = async (request: Request, response: Response): Promise<void> => {

    const res = await this.userRepository.find(request.params.id)

    response.status(200).send(res)
  }

  login = async (request: Request, response: Response): Promise<void> => {

    const res = await this.userRepository.login(request.body.username, request.body.password)

    response.status(200).send(res)
  }

  auth = async (request: Request, response: Response): Promise<void> => {
    const res = await this.authService.authenticate(request.body.username, request.body.password)

    response.status(200).send(res)
  }

}

export { UserController }
