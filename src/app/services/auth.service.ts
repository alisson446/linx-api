import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { injectable, inject } from 'tsyringe';
import { IAuthService, IVerifyTokenResponse } from '../interfaces/services/auth-service.interface';
import { Warning } from '../errors';
import { verifyPassword } from '../../shared/utils/encrypt';

@injectable()
export class AuthService implements IAuthService {
  private secretKey: string

  constructor (
    @inject("UserRepository")
    private usuarioRepository: UserRepository
  ) {
    this.secretKey = process.env.JWT_SECRET_KEY || ''
  }

  async authenticate (username: string, password: string): Promise<{
    userId: string,
    token: string
  } | null> {
    const user = await this.usuarioRepository.findByUserName(username)

    if (!user) {
      throw new Warning("Login ou senha incorretos", 401)
    }

    const passwordVerified = verifyPassword(password, user.salt || "", user.password)

    if (!passwordVerified) {
      throw new Warning("Login ou senha incorretos", 401)
    }

    const token = jwt.sign({ id: user.id, username: user.username }, this.secretKey, { expiresIn: '1d' });

    return {
      userId: user.id,
      token
    }
  }

  verifyToken = async (token: string): Promise<IVerifyTokenResponse | null> => {
    try {
      const payload = jwt.verify(token, this.secretKey) as { id: string };
      const user = await this.usuarioRepository.find(payload.id)

      if (user) {
        return { id: payload.id, user: user };
      }

      return null

    } catch (error) {
      return null;
    }
  }

}
