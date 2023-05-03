import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Header,
  Body,
  Request,
  UseGuards,
  Get,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-type', 'application/json')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  login(@Request() req) {
    return { user: req.user, message: 'Logged in' };
  }

  @Get('login-check')
  @UseGuards(AuthenticatedGuard)
  loginCheck(@Request() req) {
    return req.user;
  }

  @Get('logout')
  logout(@Request() req) {
    req.session.destroy();
    return { message: 'Session has ended' };
  }
}
