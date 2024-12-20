import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleGuard } from './guard/google.guard';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Get('hello')
  hello() {
    console.log(process.env);
  }

  @Public()
  @Get('google')
  @UseGuards(GoogleGuard)
  async connectGoogle() {}

  @Public()
  @Get('google/redirect')
  @UseGuards(GoogleGuard)
  async connectGoogleRedirect(@Req() req, @Res() res) {
    const user = await this.authService.googleLogin(req.user);
    const jwt = this.authService.generateJwt(user);

    res.redirect(`${process.env.APP_HOMEPAGE}?token=${jwt}`);
  }
}
