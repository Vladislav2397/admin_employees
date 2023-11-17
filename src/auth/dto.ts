import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsString } from 'class-validator'

export class RegisterDto {
  @ApiProperty({
    default: 'name',
  })
  @IsString()
  name: string

  @ApiProperty({
    default: 'email@domain.com',
  })
  @IsString()
  email: string

  @ApiProperty({
    default: '12345678',
  })
  @IsString()
  password: string

  @ApiProperty({
    default: new Date(),
  })
  @IsDateString()
  birthday: Date
}
