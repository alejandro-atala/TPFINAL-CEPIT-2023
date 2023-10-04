# Sistema de Gestión para Escuelas

Este proyecto es un sistema de gestión para escuelas que proporciona funcionalidades para alumnos, profesores y padres/tutores. Permite llevar un registro de información académica, comunicación y gestión administrativa relacionada con la institución educativa.

Características y Funcionalidades

- Página de Inicio: Presenta información general sobre el colegio, fotos, eventos, documentos institucionales, proyectos, etc.
- Registro de Usuarios: Permite a los alumnos, profesores y padres/tutores crear una cuenta para acceder al sistema.
- Inicio de sesión: Los usuarios registrados pueden iniciar sesión para acceder a las funcionalidades correspondientes a su perfil.

## Funcionalidades para los Alumnos
- Ver Materias y Horarios: Los alumnos pueden consultar las materias que tienen asignadas durante el año y sus respectivos horarios.
- Notificaciones: Recibir notificaciones sobre eventos próximos en la escuela y avisos relacionados con su rendimiento académico.
- Gestión de Asistencias: Pueden dar aviso de sus ausencias y visualizar un contador de inasistencias por materia.
- Informes y Boletines: Acceden a su historial de informes y boletines, donde se encuentran las notas y evaluaciones.
- Materias Aprobadas: Consultan las materias aprobadas en cada año y pueden actualizar sus datos personales.

## Funcionalidades para los Profesores

- Listado de Alumnos: Los profesores tienen acceso al listado de alumnos de los cursos que tienen a cargo.
- Envío de Material de Estudio: Pueden compartir material de estudio con sus cursos a través de una base de datos.
- Comunicación: Envían notificaciones y notas de exámenes a los alumnos.
- Gestión de Asistencias: Realizan el registro de asistencias y pueden dar aviso de ausencias.
- Reserva de Espacios y Equipos: Acceden a un calendario para reservar equipo tecnológico o espacios comunes.



## Funcionalidades para los Padres/Tutores

- Proceso de Inscripción: Los padres/tutores pueden realizar la inscripción de sus hijos en el colegio a través de la plataforma, adjuntando los documentos requeridos.
- Seguimiento del Alumno: Acceden a información sobre el avance académico, inasistencias, comportamiento y llamados de atención del alumno(s) a cargo.
- Informe de Pagos: Verifican el estado de pago de las cuotas y reciben notificaciones sobre vencimientos.
- Actualización de Datos: Actualizan los datos personales y autorizaciones de imagen y salud.
- Comunicación y Firmas: Reciben notificaciones para firmar documentos o asistir a reuniones en el colegio.

## Alcance a Futuro

- Plataforma para Cursos Virtuales: Implementación de un sistema de aprendizaje en línea para ofrecer cursos virtuales a los alumnos.
- Registro de Asistencia Automatizado: Explorar la opción de utilizar un lector de huellas o códigos QR para registrar la asistencia de manera automática.

## Requisitos Técnicos

- El sistema está desarrollado utilizando el framework React.js y se requiere un entorno de ejecución compatible con esta tecnología.
- Se utilizan bases de datos para almacenar la información de los usuarios, notas, asistencias, entre otros datos relevantes.
- Se recomienda contar con un servidor web para alojar la aplicación y asegurar su disponibilidad.

## Instalación y Uso
1. Clonar o descargar este repositorio en tu máquina local.
2. Instalar las dependencias del proyecto ejecutando el siguiente comando: `npm install`.
3. Iniciar la aplicación con el comando: `npm start`.
4. Acceder a la aplicación a través de la URL proporcionada.
5. Registrar un usuario con nombre Admin y del tipo Profesor, para generar un Rol Administrador y asi poder cargar los Cursos, Materias, Fotos y textos de toda la pagina.
6. Por ultimo se pueden registrar los ALumnos y Profesores.

## Contribuciones

Este proyecto está abierto a contribuciones y mejoras. Si deseas colaborar, no dudes en enviar tus pull requests o reportar problemas en la sección de Issues.

## Equipo de Desarrollo

Victoria Rodriguez
Silvio Alvarez
Alejandro Atala

link carpeta google: https://drive.google.com/drive/folders/11S0JKxX8Rb3SPbrX_m9wsknzbXtDY9a1?usp=share_link


tablero trello: https://trello.com/invite/b/TaOkK94h/ATTI99c14dc4849041c6258a46138fa57d76BA84800B/tp-fip-2023


Figma:  https://www.figma.com/file/JPBIlrpBb5QEguvTsRNdVV/Pagina-Principal?node-id=0%3A1&t=yjIjYNCtjJw9HCu4-1

     

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
