

import { Controller, Post, Body, InternalServerErrorException } from '@nestjs/common';
import {EmailService} from './email.service'

@Controller('email')
export class EmailController{
  constructor(private readonly emailService: EmailService) {}

  @Post('reset')
  async sendEmail(@Body('email') email: string, subject: string): Promise<string> {
    console.log(email, subject);
    try {
      await this.emailService.sendEmail(email, subject);
      return 'Correo electrónico enviado correctamente!';
    } catch (error) {
      throw new InternalServerErrorException('Error al enviar el correo electrónico.');
    }
  }



  @Post('suscripcion')
  async sendEmailSuscripcion(@Body('email')  email: string): Promise<string> {
    console.log("suscri")
    console.log(email);
    try {
      await this.emailService.sendEmailSuscripcion(email);
      return 'Correo electrónico enviado correctamente!';
    } catch (error) {
      throw new InternalServerErrorException('Error al enviar el correo electrónico.');
    }
  }

  @Post('contacto')
  async sendEmailContacto(@Body('consulta') consulta: string, @Body('email') email: string, subject: string): Promise<string> {
    console.log("suscri")
    console.log(consulta);
    try {
      await this.emailService.sendEmailContacto(email,consulta);
      return 'Correo electrónico enviado correctamente!';
    } catch (error) {
      throw new InternalServerErrorException('Error al enviar el correo electrónico.');
    }
  }

  @Post('solicitud')
  async sendEmailSolicitud( @Body('email') email: string,  @Body('estado') estado: string): Promise<string> {
    console.log("solicitud",email,estado)
  
    try {
      await this.emailService.sendEmailSolicitud(email,estado);
      return 'Correo electrónico enviado correctamente!';
    } catch (error) {
      throw new InternalServerErrorException('Error al enviar el correo electrónico.');
    }
  }
}
