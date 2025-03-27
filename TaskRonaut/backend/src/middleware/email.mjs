import nodemailer from 'nodemailer';
import chalk from "chalk";
import {styles} from "../database/loggingStyle.mjs";
import logger from "./logger.mjs";

const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 587,  // SSL: 465
    secure: false,  // true für SSL
    auth: {
        user: "noreply@taskronaut.at",
        pass: "J7$7fFXR3v?"
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
