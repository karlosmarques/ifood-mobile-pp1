import { Controller, Post, Body , UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import type { RegisterDto } from './dtos/auth';
import type { LoginDto } from './dtos/auth';
import { AuthGuard } from './auth.guard';


@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService) {}

    @Post("/register")
    async register(@Body() body:RegisterDto) {
        return await this.authService.register(body);
    }

    @Post("/login")
    async login(@Body() body:LoginDto) {
        return await this.authService.login(body);
    }

    @Post('/esqueceusenha')
    async forgotPassword(@Body('email') email: string) {
        return await this.authService.forgotPassword(email);
    }
}


