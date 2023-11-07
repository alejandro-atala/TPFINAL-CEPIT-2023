import { Module } from '@nestjs/common';
import { SolicitudesService } from './solicitudes.service';
import { SolicitudesController } from './solicitudes.controller';
import { Solicitude } from './entities/solicitude.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
 imports: [TypeOrmModule.forFeature([Solicitude])],
  controllers: [SolicitudesController],
  providers: [SolicitudesService],
})
export class SolicitudesModule {}
