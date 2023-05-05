import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { SequelizeConfigService } from 'src/config/sequelizeConfig.service';
import { databaseConfig } from 'src/config/configuration';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/users.model';
import * as bcrypt from 'bcrypt';
import * as request from 'supertest';

const mockedUser = {
  username: 'Jhon',
  email: 'jhon@gmail.com',
  password: 'jhon123',
};

describe('Users Controller', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRootAsync({
          imports: [ConfigModule],
          useClass: SequelizeConfigService,
        }),
        ConfigModule.forRoot({
          load: [databaseConfig],
        }),
        UsersModule,
      ],
    }).compile();

    app = testModule.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    const user = new User();
    const hashedPassword = await bcrypt.hash(mockedUser.password, 10);

    user.username = mockedUser.username;
    user.password = hashedPassword;
    user.email = mockedUser.email;

    return user.save();
  });

  afterEach(async () => {
    await User.destroy({ where: { username: mockedUser.username } });
    await User.destroy({ where: { username: 'Test' } });
  });

  it('should create user', async () => {
    const newUser = {
      username: 'Test',
      email: 'test@gmail.com',
      password: 'test123',
    };

    const response = await request(app.getHttpServer())
      .post('/users/signup')
      .send(newUser);

    const passwordIsValid = await bcrypt.compare(
      newUser.password,
      response.body.password,
    );

    expect(response.body.username).toBe(newUser.username);
    expect(passwordIsValid).toBe(true);
    expect(response.body.email).toBe(newUser.email);
  });
});
