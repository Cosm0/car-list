import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';

import { SingInDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  private saltRounds = 10;

  async validateUser({ username, password }: SingInDto) {
    const foundUser = await this.usersRepository.findOne({
      where: { username },
    });

    const passMatch = password === foundUser?.password; // TODO: user hashed password as below
    // const passMatch = this.comparePassword(password, foundUser.password);
    if (!foundUser || !passMatch) return null;

    const authToken = this.jwtService.sign({
      id: foundUser.id,
      username: foundUser.username,
    });

    const decodedTokenPayload = this.jwtService.decode(authToken);
    const issuedAt = new Date(decodedTokenPayload.iat * 1000);
    const expiresOn = new Date(decodedTokenPayload.exp * 1000);

    const user = {
      id: foundUser.id,
      username,
      authToken,
      issuedAt,
      expiresOn,
    };
    return user;
  }

  hashPassword(plainTextPassword) {
    return hash(plainTextPassword, this.saltRounds);
  }

  comparePassword(plainTextPassword, hashedPassword) {
    return compare(plainTextPassword, hashedPassword);
  }
}
