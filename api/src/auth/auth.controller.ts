import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { LocalGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    return req.user;
  }
}
