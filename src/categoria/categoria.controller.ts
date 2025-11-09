import { Controller, Get } from '@nestjs/common';
import { CategoriaService } from './categoria.service';

@Controller('categoria')
export class CategoriaController {

    constructor(private categoriaService: CategoriaService ){}

    @Get()
    async listarCategorias(){
        return this.categoriaService.listarCategorias();
        
    }

}
