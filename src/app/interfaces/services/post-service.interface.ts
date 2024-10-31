import { IPost } from "../entities/post.entity"
import { IIndex } from "../Helper"
import { IPostDTO, IPostUpdate } from "../repositories/post-repository.interface"

export interface IPostService {
  index (data: IIndex): Promise<{ count: number, rows: IPost[] }>
  create (data: IPostDTO): Promise<string>
  find (id: string): Promise<IPost | null>
  update (id: string, data: IPostUpdate): Promise<IPost>
  delete (id: string): Promise<string>
}
