import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { editarPerfilDto } from './dtos/dtos';

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
        if (!pefil) {
                throw new NotFoundException("Perfil não encontrado");
            }

        return pefil
    
    }

      async update(id:number,data:editarPerfilDto){
        const user = await this.prisma.usuario.update({
            where:{id},data:{...data}
        })
        if(!user){
            throw new NotFoundException("Usuario não encontrado");
        }
       return user;
   }

   async deletaPerfil(id:number){
    const user = await this.prisma.usuario.delete({
        where:{id}
    })
    if(!user){
        throw new NotFoundException("Usuario não encontrado");
    }
    
}

}

