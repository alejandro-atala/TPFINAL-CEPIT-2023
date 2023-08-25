import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EscuelaModule } from './escuela/escuela.module';
import { CursoModule } from './curso/curso.module';
import { AlumnoModule } from './alumno/alumno.module';
import { MateriaModule } from './materia/materia.module';
import { AlumnoCursoModule } from './alumno-curso/alumno-curso.module';
import { UsuarioModule } from './usuario/usuario.module';
import { RolModule } from './rol/rol.module';
import { MateriaCursoModule } from './materia_curso/materia_curso.module';
import { AsistenciaModule } from './asistencia/asistencia.module';
import { NotasExamenesModule } from './notas_examenes/notas_examenes.module';
import { ProfesorModule } from './profesor/profesor.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "escuela", 
    entities: [
      "dist/**/**.entity{.ts,.js}" 
    ],
    synchronize: true
  }),
    EscuelaModule, 
    CursoModule, 
    AlumnoModule, 
    MateriaModule, 
    AlumnoCursoModule, 
    UsuarioModule, 
    RolModule, 
    MateriaCursoModule,
    AsistenciaModule, 
    NotasExamenesModule,
    ProfesorModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
