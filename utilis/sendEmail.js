const nodemailer = require("nodemailer");

const sendEmail = async (options) => {

    const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: process.env.PORT,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });

         await transporter.sendMail({
            from: process.env.USER,
            to: options.email,
            subject: options.subject,
            text: options.text,
        });
}

module.exports = sendEmail;