import { ApiProperty } from '@nestjs/swagger';

export class LoginUserRequest {
  @ApiProperty({ example: 'Eugeni' })
  username: string;

  @ApiProperty({ example: 'Eugeni123' })
  password: string;
}

export class LoginUserResponse {
  @ApiProperty({
    example: {
      user: {
        userId: 1,
        username: 'Eugeni',
        password: 'Eugeni123',
      },
    },
  })
  user: {
    userId: number;
    username: string;
    password: string;
  };

  @ApiProperty({ example: 'Logged in' })
  message: string;
}

export class LogoutUserResponse {
  @ApiProperty({ example: 'session has ended' })
  message: string;
}

export class LoginCheckResponse {
  @ApiProperty({ example: 1 })
  userId: 1;

  @ApiProperty({ example: 'Eugeni' })
  username: string;

  @ApiProperty({ example: 'eugeni@gmail.com' })
  email: string;
}

export class SignupResponse {
  @ApiProperty({ example: 1 })
  id: 1;

  @ApiProperty({ example: 'Eugeni' })
  username: string;

  @ApiProperty({ example: 'hashed.password.type' })
  password: string;

  @ApiProperty({ example: 'eugeni@gmail.com' })
  email: string;

  @ApiProperty({ example: '2023-03-17T17:23:33.502Z' })
  updatedAt: string;

  @ApiProperty({ example: '2023-03-17T17:23:33.502Z' })
  createdAt: string;
}
