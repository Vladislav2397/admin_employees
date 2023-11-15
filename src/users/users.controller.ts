import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'
import { CreateUserDto } from './dtos/create-user.dto'
import { UsersService } from './users.service'
import { User } from './users.intefaces'
import { RolesGuard } from 'src/guards/auth.guard'
import { Roles } from 'src/roles.decorator'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('Users')
@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll()
  }

  @Post()
  @ApiOperation({ summary: 'Create new users' })
  // @Roles(['admin'])
  create(@Body(new ValidationPipe()) createUserDto: CreateUserDto): void {
    this.usersService.create(createUserDto)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get data user' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOne(id)
  }
}
