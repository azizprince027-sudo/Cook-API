import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET!,// demander a ts de me faire confiance poure  cette valeurs 
    });
  }

  // Cette méthode est appelée automatiquement après vérification réussie du token
  async validate(contenuDuToken: any) {
    return { userId: contenuDuToken.sub };
  }
}