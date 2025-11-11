import { Controller, Get, Param, UseGuards,Request } from '@nestjs/common';
import { PerfilService } from './perfil.service';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('perfil')
export class PerfilController {

    constructor( private perfilService:PerfilService ){}

   
   @UseGuards(AuthGuard)
    @Get('usuario')
    async perfilUsuario(@Request() req){
        return await this.perfilService.perfilUsuario(req.user.sub);
    }

}
