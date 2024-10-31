import prismaManager from "../database/database"
import { Warning } from "../errors"
import { IPost } from "../interfaces/entities/post.entity"
import crypto from 'crypto'
import { IPostDTO, IPostRepository, IPostUpdate } from "../interfaces/repositories/post-repository.interface"
import { IIndex } from "../interfaces/Helper"

class PostRepository implements IPostRepository {

  private prisma = prismaManager.getPrisma()

  index = async ({ orderBy, order, skip, take, filter: _ }: IIndex): Promise<{ count: number, rows: IPost[] }> => {

    const [count, rows] = await this.prisma.$transaction([
      this.prisma.posts.count(),
      this.prisma.posts.findMany({
        skip,
        take,
        orderBy: {
          [orderBy as string]: order
        }
      })
    ])

    return { count, rows }
  }

  create = async ({
    title,
    content,
    userId
  }: IPostDTO): Promise<string> => {

    try {

      const id = crypto.randomUUID()

      await this.prisma.posts.create({
        data: {
          id,
          title,
          content,
          userId
        }
      })

      return id

    } catch (error) {
      throw new Warning('Erro ao inserir a publicação', 400)
    }
  }

  find = async (id: string): Promise<IPost | null> => {

    const post = await this.prisma.posts.findUnique({
      where: {
        id
      }
    })

    return post

  }

  update = async (id: string, data: IPostUpdate): Promise<IPost> => {
    const {
      title,
      content
    } = data

    try {

      return await this.prisma.posts.update({
        data: {
          title,
          content
        },
        where: {
          id
        }
      })

    } catch (error) {
      throw new Warning('Erro ao atualizar publicação', 400)
    }
  }

  delete = async (id: string): Promise<string> => {

    try {

      await this.prisma.posts.delete({
        where: {
          id
        }
      })

      return 'Publicação deletada'

    } catch (error) {
      throw new Warning('Erro ao deletar publicação', 400)
    }
  }

}

export { PostRepository }
