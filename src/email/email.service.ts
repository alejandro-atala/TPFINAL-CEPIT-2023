

import * as nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vsadesarrollos@gmail.com',
    pass: 'mjeo axrr epoe wcwq'
  }
});





export class EmailService {
  async sendEmail(para: string, subject: string): Promise<void> {


    const emailContent = `
    <div style="background-color:rgba(78, 202, 155, 0.618); padding: 20px;">
      <div style="background-color: white; border-radius: 10px; padding: 20px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333;">Restablecimiento de contraseña</h2>
        <p>Haga click en el siguiente enlace para cambiar su contraseña</p>


        <a href="http://localhost:3001/resetpass?email=${para}" style="text-decoration: none;">

     

        <button style="background-color: #008CBA; /* Blue */
                       border: none;
                       color: white;
                       padding: 10px 24px;
                       text-align: center;
                       text-decoration: none;
                       display: inline-block;
                       font-size: 16px;
                       margin: 4px 2px;
                       cursor: pointer;
                       border-radius: 5px;">
              Cambiar contraseña
            </button> 


       
      </div>
    </div>
  `;


    console.log('enviando mail...', emailContent)
    let mailOptions = {
      from: 'vsadesarrollos@gmail.com',
      to: para,
      subject: 'Restablecer contraseña',
      html: emailContent
    };

    await transporter.sendMail(mailOptions);


  }





  async sendEmailContacto(para: string, consulta: string): Promise<void> {


    const emailContent2 = `
  <div style="background-color:rgba(78, 202, 155, 0.618); padding: 20px;">
    <div style="background-color: white; border-radius: 10px; padding: 20px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #333;">Contacto</h2>
      <p>El usuario ${para} quiere contacterse por asesoramiento</p>
      <p>Su consulta es : ${consulta}</p>
     
    </div>
  </div>
`;

    let mailOptions2 = {
      from: 'vsadesarrollos@gmail.com',
      to: 'vsadesarrollos@gmail.com',
      subject: 'Nueva solicitud de contacto',
      html: emailContent2
    };
    await transporter.sendMail(mailOptions2);
  }






  async sendEmailSuscripcion(para: string): Promise<void> {


    const emailContent = `
    <div style="background-color:rgba(78, 202, 155, 0.618); padding: 20px;">
      <div style="background-color: white; border-radius: 10px; padding: 20px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333;">Gracias por contactarse</h2>
        <p>A la brevedad un representante se contactara para brindarle mas informacion sobre el sistema de gestion de escuelas,  
        detalles de costos y funcionamiento</p>
       
      </div>
    </div>
  `;



    let mailOptions = {
      from: 'vsadesarrollos@gmail.com',
      to: para,
      subject: 'Suscripcion exitosa',
      html: emailContent
    };
    await transporter.sendMail(mailOptions);


    let mailOptions2 = {
      from: 'vsadesarrollos@gmail.com',
      to: 'vsadesarrollos@gmail.com',
      subject: 'Nueva suscripcion',
      html: `El usuario ${para} desea asesoramiento del sistema de gestion`
    };

    await transporter.sendMail(mailOptions2);


  }

}
