// avisos.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aviso } from './entities/aviso.entity'; 
import { AvisosController } from './aviso.controller'; 
import { AvisosService } from './aviso.service'; 

@Module({
  imports: [TypeOrmModule.forFeature([Aviso])],
  controllers: [AvisosController],
  providers: [AvisosService],
})
export class AvisosModule {}
