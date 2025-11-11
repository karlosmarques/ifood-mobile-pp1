import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/email/email.service';
import { PrismaService } from '../prisma/prisma.service';
import type { LoginDto, RegisterDto } from './dtos/auth';


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService:JwtService, private mailService:MailService ){}

    async register(data:RegisterDto){
        const usarioExistente = await this.prisma.usuario.findUnique({
            where:{
                email:data.email
            }
         })

         if(usarioExistente){
            throw new UnauthorizedException("Usuario ja existe");
         }

         const hashedPassword = await bcrypt.hash(data.password, 10);
         
         const novoUsuario  = await this.prisma.usuario.create({data:{
            email: data.email,
            senha: hashedPassword,
            nome: data.username
         }});
         return novoUsuario;
     }

        async login(data:LoginDto){ 
            const usuario = await this.prisma.usuario.findUnique({
                where:{
                    email:data.email
                }
            });
            if(!usuario){
                throw new UnauthorizedException("Credenciais invalidas");
            }
            const senhaValida = await bcrypt.compare(data.password, usuario.senha);
            if(!senhaValida){
                throw new UnauthorizedException("Credenciais invalidas");
            }
            const token = await this.jwtService.signAsync({sub: usuario.id, email: usuario.email});
            return {token};
        }

    async forgotPassword(email: string) {
    
    const user = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

   
    const token = this.jwtService.sign(
      { userId: user.id },
      { secret: process.env.JWT_SECRET, expiresIn: '15m' },
    );

    
    await this.mailService.sendPasswordReset(user.email, token);

    return { message: 'Email de recuperação enviado!' };
  }

    async resetPassword(token: string, novaSenha: string) {
    try {
     
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      
      const hashedPassword = await bcrypt.hash(novaSenha, 10);

      
      await this.prisma.usuario.update({
        where: { id: payload.userId },
        data: { senha: hashedPassword },
      });

      return { message: 'Senha atualizada com sucesso!' };
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }
}

