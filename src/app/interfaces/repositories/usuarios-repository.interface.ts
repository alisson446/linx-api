import { IUsuario } from "../entities/usuario.entity"

export interface IUsuarioRepository {
  create (data: IUsuarioDTO): Promise<string>
  find (id: string): Promise<IUsuario | null>
  login (username: string, password: string): Promise<IUsuario>
}


export interface IUsuarioDTO {
  nome: string
  email: string
  username: string
  password: string
}
