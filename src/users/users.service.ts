import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  findOne(filter: {
    where: {
      id?: string;
      username?: string;
      email?: string;
    };
  }): Promise<User> {
    return this.userModel.findOne({ ...filter });
  }

  async create(
    createUserDto: CreateUserDto,
  ): Promise<User | { warningMessage: string }> {
    const user = new User();
    const existingByUsername = await this.findOne({
      where: {
        username: createUserDto.username,
      },
    });
    const existingByEmail = await this.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (existingByUsername)
      return { warningMessage: 'User with this username already exist.' };
    if (existingByEmail)
      return { warningMessage: 'User with this email already exist.' };

    // hash password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    user.username = createUserDto.username;
    user.password = hashedPassword;
    user.email = createUserDto.email;

    // save user in db
    return user.save();
  }
}
