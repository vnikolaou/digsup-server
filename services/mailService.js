'use strict';

const nodemailer = require("nodemailer");

class MailService {
    transporter;

    constructor() {
        // create reusable transporter object using the default SMTP transport
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false
        });
    }

    async sendMail(email) {
        const info = await this.transporter.sendMail({
            from: 'people@digsup.co', // sender address
            to: email, // list of receivers
            subject: "Email activation", // Subject line
            text: `Hello, your email ${email} has been activate`
        });

        return info.messageId;      
    }

}

module.exports = new MailService();