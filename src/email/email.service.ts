

import * as nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aledorrego89@gmail.com',
    pass: 'szoq utxp stcm mvkb'
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


    console.log('enviando mail...',emailContent)
    let mailOptions = {
      from: 'micapsicologa@gmail.com',
      to: para, 
      subject: 'Restablecer contraseña',
      html: emailContent
    };
console.log(mailOptions);
    await transporter.sendMail(mailOptions);


  }

}
