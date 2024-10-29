import { generatePassword, verifyPassword } from "../../shared/utils/encrypt"
import prismaManager from "../database/database"
import { Warning } from "../errors"
import { IUsuario, IUsuarioDTO, IUsuarioResponse } from "../interfaces/repositories/usuarios-repository.interface"
import crypto from 'crypto'

class UsuarioRepository implements IUsuario {

  private prisma = prismaManager.getPrisma()

  create = async ({
    nome,
    email,
    username,
    password
  }: IUsuarioDTO): Promise<string> => {

    try {

      const id = crypto.randomUUID()

      const pass = generatePassword(password)

      await this.prisma.usuarios.create({
        data: {
          id,
          nome,
          email,
          username,
          password: pass.password,
          salt: pass.salt
        }
      })

      return id

    } catch (error) {
      throw new Warning('Erro ao inserir Usuario', 400)
    }
  }

  find = async (id: string): Promise<IUsuarioResponse | null> => {

    const usuario = await this.prisma.usuarios.findUnique({
      where: {
        id
      }
    })

    if (!usuario) {
      throw new Warning("Usuario não encontrado", 400)
    }

    return usuario

  }

  login = async (username: string, password: string): Promise<IUsuarioResponse> => {

    const usuario = await this.prisma.usuarios.findUnique({
      where: {
        username
      }
    })

    if (!usuario) {
      throw new Warning("Login ou senha incorretos", 401)
    }

    const passwordVerified = verifyPassword(password, usuario.salt || "", usuario.password)

    if (!passwordVerified) {
      throw new Warning("Login ou senha incorretos", 401)
    }

    return usuario
  }

}

export { UsuarioRepository }
