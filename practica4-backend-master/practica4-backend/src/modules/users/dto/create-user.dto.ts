import { ApiProperty } from "@nestjs/swagger";
import { IsEmail,IsNotEmpty,IsString, MinLength } from "class-validator";

export class CreateUserDto{
    @ApiProperty({description:'nombre del usuario'})
    @IsString({message:'el nombre deben ser caracteres'})
    @IsNotEmpty({message:'el nombre no debe estar vacio'})
    name: string;

    @ApiProperty({description:'Correo electronico'})
    @IsEmail({},{message:'el formato debe ser correcto'})
    @IsNotEmpty({message:'el correo no debe estar vacio'})
    email: string;

    @ApiProperty({description:'contrasena del usuario'})
    @MinLength(6,{message:'la contrasena debe tener como minimo 6 caracteres'})
    @IsNotEmpty({message:'la contrasena debe ser una cadena'})
    password: string;
}