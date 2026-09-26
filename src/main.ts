import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();

// transforme cest pour les espaces

// validation pipe sert a  activer les class validators 

/*   
app.useGlobalPipes(new ValidationPipe({...})) → active la validation automatique sur toutes les routes de l'application, basée sur les DTO
whitelist: true → supprime automatiquement tout champ envoyé qui n'est pas défini dans le DTO (protection supplémentaire — empêche par exemple d'injecter un userId malicieux dans le body, comme on en parlait au Jour 4 !)
forbidNonWhitelisted: true → au lieu de juste ignorer silencieusement les champs en trop, rejette carrément la requête avec une erreur 400 si des champs non prévus sont envoyés — encore plus strict et sûr
*/