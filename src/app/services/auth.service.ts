import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { injectable, inject } from 'tsyringe';
import { IUser } from '../interfaces/entities/user.entity';

interface User {
  id: string
  user: IUser
}

@injectable()
export class AuthService {
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
    const user = await this.usuarioRepository.login(username, password)

    const token = jwt.sign({ id: user.id, username: user.username }, this.secretKey, { expiresIn: '1d' });

    return {
      userId: user.id,
      token
    }
  }

  verifyToken = async (token: string): Promise<User | null> => {
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
