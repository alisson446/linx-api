import { generatePassword, verifyPassword } from "../../shared/utils/encrypt"
import prismaManager from "../database/database"
import { Warning } from "../errors"
import { IUser } from "../interfaces/entities/user.entity"
import { IUserRepository, IUserDTO } from "../interfaces/repositories/users-repository.interface"
import crypto from 'crypto'

class UserRepository implements IUserRepository {

  private prisma = prismaManager.getPrisma()

  create = async ({
    name,
    email,
    username,
    password
  }: IUserDTO): Promise<string> => {

    try {

      const id = crypto.randomUUID()

      const pass = generatePassword(password)

      await this.prisma.users.create({
        data: {
          id,
          name,
          email,
          username,
          password: pass.password,
          salt: pass.salt
        }
      })

      return id

    } catch (error) {
      throw new Warning('Erro ao inserir Usuário', 400)
    }
  }

  find = async (id: string): Promise<IUser | null> => {

    const user = await this.prisma.users.findUnique({
      where: {
        id
      }
    })

    if (!user) {
      throw new Warning("Usuário não encontrado", 400)
    }

    return user

  }

  login = async (username: string, password: string): Promise<IUser> => {

    const user = await this.prisma.users.findUnique({
      where: {
        username
      }
    })

    if (!user) {
      throw new Warning("Login ou senha incorretos", 401)
    }

    const passwordVerified = verifyPassword(password, user.salt || "", user.password)

    if (!passwordVerified) {
      throw new Warning("Login ou senha incorretos", 401)
    }

    return user
  }

}

export { UserRepository }
