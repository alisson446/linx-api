import { container } from "tsyringe"
import "reflect-metadata"

//repositories
import { UsuarioRepository } from '../../app/repositories/usuario.repository'

//interfaces
import { IUsuarioRepository } from "../../app/interfaces/repositories/usuarios-repository.interface"


container.registerSingleton<IUsuarioRepository>(
  "UsuarioRepository",
  UsuarioRepository
)
