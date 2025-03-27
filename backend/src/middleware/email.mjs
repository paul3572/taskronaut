import nodemailer from 'nodemailer';
import chalk from "chalk";
import {styles} from "../database/loggingStyle.mjs";
import logger from "./logger.mjs";
import {config} from "../config/config.mjs";

const transporter = nodemailer.createTransport({
    host: config.nodeMailer.host,
    port: config.nodeMailer.port,
    secure: config.nodeMailer.secure,
    auth: {
        user: config.nodeMailer.user,
        pass: config.nodeMailer.pass
    }
});

/**
 * Sending mail with specified options (email address, content)
 *
 * @param mailOptions  Configuration for Nodemailer
 * @returns {Promise<void>}
 */
export async function sendEmail(mailOptions) {
    await transporter.sendMail(mailOptions);
    logger.info(chalk.hex(styles.success)`E-Mail sent successfully!`);
}
