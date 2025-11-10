import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PerfilService {

    constructor( private prisma:PrismaService){}

    
    async perfilUsuario(id:number){
        const pefil = await this.prisma.usuario.findUnique({
            where:{id},
            select:{
                nome:true,
                email:true,
                endereco:true
            }
        })
        return pefil
    
    }
}


