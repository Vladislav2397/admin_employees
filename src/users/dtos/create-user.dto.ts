import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsDateString } from 'class-validator'

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty({
    type: Date,
  })
  @IsDateString()
  birthday: Date
}
