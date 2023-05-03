import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Eugeni' })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ example: 'Eugeni123' })
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ example: 'eugeni@gmail.com' })
  @IsNotEmpty()
  readonly email: string;
}
