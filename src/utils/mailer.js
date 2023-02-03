const nodemailer = require('nodemailer');
require('dotenv').config();

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: true,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD
    }
});

/**
 * Mail Message
 * @typedef {Object} MailMessage
 * @property {string} from - Sender email address
 * @property {string[]} to - Array of recipient email addresses
 * @property {string} subject - The subject of the email
 * @property {string} body - The contents of the email
 */

/**
 * Logins a user with the supplied credentials
 * @param {MailMessage} message 
 * @returns {Promise<Result>} The operation result with the JWT token if successful
 */
const sendMail = async (message) => {
    await transporter.sendMail(message);
}

module.exports = {
    sendMail
};