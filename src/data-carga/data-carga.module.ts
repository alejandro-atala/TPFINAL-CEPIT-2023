import { Module } from '@nestjs/common';
import { DataCargaService } from './data-carga.service';
import {UploadController } from './data-carga.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Textos } from './entities/data-carga.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Textos
    ]),
    
  ],
  controllers: [UploadController],
  providers: [DataCargaService],
})
export class DataCargaModule {}
