import { Warning } from '../errors'
import { IPost } from '../interfaces/entities/post.entity'
import { IIndex } from '../interfaces/Helper'
import { IPostDTO, IPostRepository, IPostUpdate } from '../interfaces/repositories/post-repository.interface'
import { IPostService } from '../interfaces/services/post-service.interface'
import { inject, injectable } from "tsyringe"

@injectable()
class PostService implements IPostService {
  constructor (
    @inject("PostRepository")
    private postRepository: IPostRepository
  ) { }

  async index (data: IIndex): Promise<{ count: number; rows: IPost[] }> {
    return await this.postRepository.index(data)
  }

  async create (data: IPostDTO) {
    return await this.postRepository.create(data)
  }

  async find (id: string) {
    const post = await this.postRepository.find(id)

    if (!post) {
      throw new Warning("Publicação não encontrada", 400)
    }

    return post
  }

  async update (id: string, data: IPostUpdate): Promise<IPost> {
    const post = await this.postRepository.find(id)

    if (!post) {
      throw new Warning("Publicação não encontrada", 400)
    }

    return await this.postRepository.update(id, data)
  }

  async delete (id: string): Promise<string> {
    return await this.postRepository.delete(id)
  }

}

export { PostService }
