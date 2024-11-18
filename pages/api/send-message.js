import nodemailer from 'nodemailer';
require('dotenv').config({ path: './.env.local' });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, // Ignorar a verificação de certificado
      },
    });

    let mailOptions = {
      from: `"Nome do Remetente" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, 
      subject: 'Nova Mensagem do Formulário de Contato',
      text: `Nome: ${name}\nEmail: ${email}\nMensagem: ${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      res.status(500).json({ message: 'Erro ao enviar a mensagem' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
