import { Request, Response, NextFunction } from "express"
import { AuthService } from "../services/auth.service"
import { container } from "tsyringe";

const authService = container.resolve(AuthService)

const authenticateToken = async (request: Request, response: Response, next: NextFunction) => {

  const noAuthRoutes = [
    "/users",
    "/auth/login"
  ]

  const authHeader = request.headers['authorization'];

  if (!authHeader) {
    let access = false
    noAuthRoutes.map(path => {

      if (request.path == path) {
        access = true
      }

    })

    if (!access) {
      return response.sendStatus(401)
    }
    return next()
  }

  const user = await authService.verifyToken(authHeader);

  if (!user) {
    response.sendStatus(401)
    return null
  }

  request.headers = {
    ...request.headers,
    user: JSON.stringify(user.user)
  }

  next()
}

export { authenticateToken }
