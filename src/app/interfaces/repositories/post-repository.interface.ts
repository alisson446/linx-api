import { IPost } from "../entities/post.entity"
import { IIndex } from "../Helper"

export interface IPostRepository {
  index (data: IIndex): Promise<{ count: number, rows: IPost[] }>
  create (data: IPostDTO): Promise<string>
  find (id: string): Promise<IPost | null>
  update (id: string, data: IPostUpdate): Promise<IPost>
  delete (id: string): Promise<string>
}


export interface IPostDTO {
  title: string
  content: string
  userId: string
}

export interface IPostUpdate extends Omit<IPostDTO, "userId"> { }
