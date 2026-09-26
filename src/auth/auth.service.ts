import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private prisma: PrismaService,
  ) {}

  // bloc inscription
  async register(registerDto: RegisterDto) {
    const existeUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existeUser) {
      throw new ConflictException('Cet email est déjà utilisé');
    }

    return this.usersService.create(registerDto);
  }

  // bloc connexion
  async login(loginDto: LoginDto) {
    // recherche de l utilisateurs
    const utilisateur = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!utilisateur) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    // verification de mots passe

    const motDePasseValide = await bcrypt.compare(loginDto.password, utilisateur.password);

    if (!motDePasseValide) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    // le token  jwt 

    const payload = { sub: utilisateur.id }; // l'id de l'utilisateur qui se connecte
    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }
}