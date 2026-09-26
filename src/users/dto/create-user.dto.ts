import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
// pour le blaze    
  @IsString()
  @IsNotEmpty()
  name: string;
// pour le mail
@IsNotEmpty()
@IsString()
@IsEmail()
email: string;
// Pour le mots de passe 
@IsNotEmpty()
@IsString()
@MinLength(8)
password :string;
}
