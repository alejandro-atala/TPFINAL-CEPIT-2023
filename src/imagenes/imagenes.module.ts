import { Module } from '@nestjs/common';
import { ImagenesService } from './imagenes.service';
import { ImagenesController } from './imagenes.controller';
import { Imagenes } from './entities/imagene.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({

  imports: [
    TypeOrmModule.forFeature([
      Imagenes
    ]),  ],
  controllers: [ImagenesController],
  providers: [ImagenesService],
})
export class ImagenesModule {}
