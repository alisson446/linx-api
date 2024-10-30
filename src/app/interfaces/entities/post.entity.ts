import { IUsuario } from "./usuario.entity"

export interface IPost {
  id: string
  titulo: string
  conteudo: string
  createdAt: Date
  updatedAt: Date
  usuarioId: string
  Usuario?: IUsuario
}