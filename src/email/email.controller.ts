

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
  async sendEmailSuscripcion(@Body('email') email: string, subject: string): Promise<string> {
    console.log("suscri")
    console.log(email, subject);
    try {
      await this.emailService.sendEmailSuscripcion(email);
      return 'Correo electrónico enviado correctamente!';
    } catch (error) {
      throw new InternalServerErrorException('Error al enviar el correo electrónico.');
    }
  }
}
