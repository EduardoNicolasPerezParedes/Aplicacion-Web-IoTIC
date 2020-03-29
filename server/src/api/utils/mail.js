const nodemailer = require('nodemailer');

const mail = {
    /**
     * Envía un correo electrónico.
     * @param {string} msg Mensaje a ser enviado
     * @param {string} to Destinatarios
     */
    async send(subject, msg, to) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'semillero.iotic@gmail.com',
                pass: 'contra1234'
            }
        });

        const mailOptions = {
            from: 'no-reply <no-reply@no-reply.co>',
            to: to,
            subject: subject, 
            text: msg
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log('server: error: ' + err.message);
            }
            });
        }
}

module.exports = mail;