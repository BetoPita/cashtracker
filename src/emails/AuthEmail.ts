import { transport } from "../config/nodemailer";

type EmailType = {
  name: string;
  email: string;
  token: string;
}
export class AuthEmail {

  static sendConfirmationEmail = async (user: EmailType) => {
    const email = await transport.sendMail({
      from: 'CashTracker <admin@cashtracker.com>',
      to: user.email,
      subject: 'Confirma tu cuenta en CashTracker',
      html: `
          <h1>Hola ${user.name},</h1>
          <p>Gracias por registrarte en CashTracker. Por favor, confirma tu cuenta haciendo clic en el siguiente enlace:</p>
          <a href="https://cashtracker.com/confirm/${user.token}">Confirmar cuenta</a>
          <p>Si no te has registrado en CashTracker, por favor ignora este correo.</p>
          <p>Saludos,</p>
          <p>El equipo de CashTracker</p>
        `
    })
    console.log("Mensaje enviado", email.messageId);
  }
  static sendResetPasswordEmail = async (user: EmailType) => {
    const email = await transport.sendMail({
      from: 'CashTracker <admin@cashtracker.com>',
      to: user.email,
      subject: 'Reestablece tu contraseña',
      html: `
          <h1>Hola ${user.name},</h1>
          <p>Has solicitado reestablecer tu password, reestablece haciendo clic en el siguiente enlace:</p>
          <a href="https://cashtracker.com/confirm/${user.token}">Reestablecer password</a>
          <p>e ingresa el código <b>${user.token}</b></p>
          <p>Saludos,</p>
          <p>El equipo de CashTracker</p>
        `
    })
    console.log("Mensaje enviado", email.messageId);
  }
}
