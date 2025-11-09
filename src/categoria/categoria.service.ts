import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriaService {

    constructor(private prisma:PrismaService){}

    async listarCategorias(){
        const todos = await this.prisma.categoria.findMany()
        return todos;
    }
}
