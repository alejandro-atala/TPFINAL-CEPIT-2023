import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

// Import UsuarioModule into the EmailModule
@Module({
  imports: [JwtModule.register({ secret: 'ProgramadorFullStack2023', signOptions: { expiresIn: '5m' } })],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}

