import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthPayloadDto } from './dto/auth.dto';

const fakeUsers = [
  {
    id: 1,
    username: 'test',
    password: 'test123',
  },
];

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  validateUser({ username, password }: AuthPayloadDto) {
    const findUser = fakeUsers.find((user) => user.username === username);
    if (!findUser) return null;
    if (password === findUser.password) {
      const { password, ...user } = findUser;
      return this.jwtService.sign(user);
    }
  }
}
