import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtBody } from './types/jwt-body';
import { JwtService } from '@nestjs/jwt';
import { GoogleUser } from './types/google-user';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  generateJwt(user: User): string {
    const body: JwtBody = { id: user.id, email: user.email };
    return this.jwtService.sign(body);
  }

  async googleLogin(googleUser: GoogleUser) {
    const user = await this.userRepository.findByEmail(googleUser.email);
    if (user) {
      return user;
    }

    return this.userRepository.create({ email: googleUser.email });
  }
}
