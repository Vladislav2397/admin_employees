import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from 'src/guards/local-auth.guard'
import { ApiTags } from '@nestjs/swagger'
import { RegisterDto } from './dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Body() dto: any) {
    return this.authService.login(req.user)
  }

  @Post('/registration')
  async register(@Request() req, @Body() dto: RegisterDto) {
    return this.authService.register(dto)
  }
}
