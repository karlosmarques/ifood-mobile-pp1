import { Controller, Get, Param } from '@nestjs/common';
import { PerfilService } from './perfil.service';
@Controller('perfil')
export class PerfilController {

    constructor( private perfilService:PerfilService ){}

   
    @Get(":id")
    async perfilUsuario(@Param("id") id:String){
        return await this.perfilService.perfilUsuario(+id);
    }

}
