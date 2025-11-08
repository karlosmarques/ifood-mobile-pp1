import { Controller,Get } from '@nestjs/common';
import { RestauranteService } from './restaurante.service';

@Controller('restaurante')
export class RestauranteController {

    constructor( private restaurenteService: RestauranteService){}

    @Get()
    async listarRestaurantes(){
        return this.restaurenteService.listarRestaurantes();
    }
    
}
