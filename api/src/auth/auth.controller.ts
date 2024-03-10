import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    return req.user;
  }

  @Get('test')
  @UseGuards(JwtAuthGuard)
  test(@Req() req: Request) {
    return req.user;
  }
}
