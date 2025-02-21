import nodemailer from 'nodemailer';
import chalk from "chalk";
import {styles} from "../database/loggingStyle.mjs";
import logger from "./logger.mjs";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "platzerdominik5@gmail.com",
        pass: "drtevlssezqzmlaw"
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
