import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RestauranteService {

    constructor(private prisma: PrismaService){}


    async listarRestaurantes(){
        const todos = await this.prisma.restaurante.findMany({
            include:{
                categoria:true
            }
        });
        return todos;
    }


}
