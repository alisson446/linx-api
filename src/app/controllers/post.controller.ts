import { inject, injectable } from "tsyringe"
import { Request, Response } from 'express'
import { IPostService } from "../interfaces/services/post-service.interface"
import { formatIndexFilters } from "../../shared/utils/filters"

@injectable()
class PostController {
  constructor (
    @inject("PostService")
    private postService: IPostService
  ) { }

  index = async (request: Request, response: Response): Promise<void> => {

    const { orderBy, order, skip, take, filter } = formatIndexFilters(request)

    const res = await this.postService.index({
      orderBy,
      order,
      skip,
      take,
      filter
    })

    response.status(200).send(res)
  }

  create = async (request: Request, response: Response): Promise<void> => {

    const res = await this.postService.create(request.body)

    response.status(200).send(res)
  }

  find = async (request: Request, response: Response): Promise<void> => {

    const res = await this.postService.find(request.params.id)

    response.status(200).send(res)
  }

  update = async (request: Request, response: Response): Promise<void> => {

    const { id } = request.params

    const res = await this.postService.update(id, request.body)

    response.status(200).send(res)
  }

  delete = async (request: Request, response: Response): Promise<void> => {
    const res = await this.postService.delete(request.params.id)

    response.status(200).send(res)
  }

}

export { PostController }
