import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CursoModule } from './curso/curso.module';
import { AlumnoModule } from './alumno/alumno.module';
import { MateriaModule } from './materia-curso/materia-curso.module';
import { AlumnoCursoModule } from './alumno-curso/alumno-curso.module';
import { MateriaCursoModule } from './materia/materia.module';
import { AsistenciaModule } from './asistencia/asistencia.module';
import { NotasExamenesModule } from './notas_examenes/notas_examenes.module';
import { ProfesorModule } from './profesor/profesor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [JwtModule.register({
    secret: 'ProgramadorFullStack2023',
    signOptions: { expiresIn: '1h' },
  }),
  TypeOrmModule.forRoot({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "escuela",
    entities: [
      "dist/**/**.entity{.ts,.js}", "node_modules/@nestjs/jwt"
    ],
    synchronize: true
  }),

    CursoModule,
    AlumnoModule,
    MateriaModule,
    AlumnoCursoModule,
    UsuarioModule,
    MateriaCursoModule,
    AsistenciaModule,
    NotasExamenesModule,
    ProfesorModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
