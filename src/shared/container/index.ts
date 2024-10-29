import { container } from "tsyringe"
import "reflect-metadata"

//repositories
import { UsuarioRepository } from '../../app/repositories/usuario.repository'

//interfaces
import { IUsuario } from "../../app/interfaces/repositories/usuarios-repository.interface"

container.registerSingleton<IUsuario>(
  "UsuarioRepository",
  UsuarioRepository
)
