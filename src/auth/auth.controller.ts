import { Body, Controller, Post, Get, UseGuards, Request, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { JwtAuthGuard } from './jwt-auth.guard.js';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // inscriptions
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  // connexion
  @Post('login')
  @HttpCode(200)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // renvoie de l'utilisateur connecté via JwtStrategy.validate()
  @UseGuards(JwtAuthGuard)
  @Get('profil')
  voirMonProfil(@Request() requete: any) {
    return requete.user;
  }
}

// nb le {} represente le corps de la fonction; il declare la propriete this..... ET assigne avec valleurs