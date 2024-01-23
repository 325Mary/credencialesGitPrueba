const nodemailer = require('nodemailer');



const sendEmail = async ({ to, subject, text, html }) => {
  // Configurar el transporter de Nodemailer
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'litterbox212@gmail.com',
      pass: 'rtpr yunf crkt daif'  // Para un entorno de producción, usa variables de entorno
    }
  });

  // Configurar las opciones del correo electrónico
  let mailOptions = {
    to: to,
    subject: subject,
    text: text,
    html: html  // Puede ser una cadena HTML para un correo electrónico con formato
  };

  // Enviar el correo electrónico
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email enviado: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error al enviar el email:', error);
    throw error;
  }
};

module.exports = {
    sendEmail
};
