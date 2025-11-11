import { Controller, Get, Param, UseGuards,Request, Patch, Body } from '@nestjs/common';
import { PerfilService } from './perfil.service';
import { AuthGuard } from 'src/auth/auth.guard';
import type { editarPerfilDto } from './dtos/dtos';

@Controller('perfil')
export class PerfilController {

    constructor( private perfilService:PerfilService ){}

   
   @UseGuards(AuthGuard)
    @Get()
    async perfilUsuario(@Request() req){
        return await this.perfilService.perfilUsuario(req.user.sub);
    }

   @UseGuards(AuthGuard)
    @Patch('')
    async update(@Request() req,@Body() Body:editarPerfilDto){
        return await this.perfilService.update(req.user.sub,Body);
    }

}
