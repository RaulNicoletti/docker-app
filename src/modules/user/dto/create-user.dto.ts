import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Email inválido' })
  public email: string;

  @IsString()
  @MinLength(3, {
    message: 'Password precisa ter no mínimo $constraint1 caracteres',
  })
  public password: string;
}
