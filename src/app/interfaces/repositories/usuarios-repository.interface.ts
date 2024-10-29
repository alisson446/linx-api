export interface IUsuario {
  create (data: IUsuarioDTO): Promise<string>
  find (id: string): Promise<IUsuarioResponse | null>
  login (username: string, password: string): Promise<IUsuarioResponse>
}


export interface IUsuarioDTO {
  nome: string
  email: string
  username: string
  password: string
}

export interface IUsuarioResponse extends IUsuarioDTO {
  id: string
}

export interface IUsuarioLogin extends IUsuarioDTO {
  username: string
  password: string
}
