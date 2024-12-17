import { Injectable } from "@nestjs/common";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { Repository } from "typeorm";
import { RegisterAuthDto } from "./dto/register-auth.dto";
import { hash } from 'bcrypt';

@Injectable()
export class AuthService{
    constructor(private jwtService: JwtService,
       @InjectRepository(User) private readonly userRepository: Repository<User>){}
    async funRegister(objUser:RegisterAuthDto){
      const {password}=objUser
      //console.log("antes: ",objUser)
      const plainToHash=await hash(password,12)
      //console.log(plainToHash)
      objUser={...objUser,password:plainToHash}
      //console.log("despues: ",objUser)
      return this.userRepository.save(objUser) //guardar bdd
    }   
    login(credenciales: LoginAuthDto){
        let payload={email:"raul.paez@outlook.com", id:1}
        const token= this.jwtService.sign(payload)
        return {token:token}; 
    }

    async register(userData: { email: string; password: string; name:string }) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUser = this.userRepository.create({...userData, password: hashedPassword});
        await this.userRepository.save(newUser);
        return { message: 'Usuario registrado', user: { email: newUser.email } };
      }
    
      async validateUser(email: string, password: string) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (user && (await bcrypt.compare(password, user.password))) {
          return user;
        }
        return null;
      }
    
      generateJwt(user: User) {
        const payload = { username: user.name, sub: user.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }

}