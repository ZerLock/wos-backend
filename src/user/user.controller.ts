import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from 'src/auth/user.context';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  @Get()
  async me(@CurrentUser() user: User) {
    console.log('coucou:', user);
    return user;
  }
}
