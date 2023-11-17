import { Injectable, BadRequestException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'
import { RegisterDto } from './dto'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // TODO: add bcrypt lib
  async validateUser(usernameOrEmail: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsernameOrEmail(
      usernameOrEmail,
    )
    if (user && user.password === password) {
      const { password, ...result } = user
      return result
    }

    return null
  }

  async login({ username, userId }: any) {
    const payload = { username, sub: userId }

    return {
      accessToken: this.jwtService.sign(payload),
    }
  }

  async isLoginExists(dto: RegisterDto): Promise<boolean> {
    const users = await this.usersService.findWithNameOrEmail(dto)

    return !users.length
  }

  async register(dto: RegisterDto) {
    if (await this.isLoginExists(dto)) throw new BadRequestException()

    this.usersService.create(dto)
  }
}
