import { container } from "tsyringe"
import "reflect-metadata"
import "../../shared/container/index"

//controllers
import { UsuarioController } from "./usuario.controller"

export const usuarioController = container.resolve(UsuarioController)
