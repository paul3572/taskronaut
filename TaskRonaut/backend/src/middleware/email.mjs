import nodemailer from 'nodemailer';
import chalk from "chalk";
import {styles} from "../database/loggingStyle.mjs";
import logger from "./logger.mjs";

const transporter = nodemailer.createTransport({
    host: "mailserver",
    port: 587,
    secure: false,
    auth: {
        user: "noreply@taskronaut.at",
        pass: "MeinSehrStarkesPasswort"
    }
});

/**
 * Sending mail with specified options (email address, content)
 *
 * @param mailOptions  Configuration for Nodemailer
 * @returns {Promise<void>}
 */
export async function sendEmail(mailOptions) {
    try {
        await transporter.sendMail(mailOptions);
        logger.info(chalk.hex(styles.success)`E-Mail sent successfully!`);
    } catch (error) {
        logger.error(chalk.hex(styles.error)`Error sending email: ${error}`);
        throw error;
    }
}