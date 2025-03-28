import {responseMessages} from "../database/responseMessages.mjs";
import logger from "./logger.mjs";
import chalk from "chalk";
import {styles} from "../config/loggingStyle.mjs";

export async function serverResponse(res, {statusCode, message = '', data = null}) {
    const responseMessage = message || responseMessages[statusCode] || responseMessages.default;

    const response = {
        message: responseMessage,
        data: data,
    };
    logger.debug(chalk.hex(styles.debug)(`Response: ${JSON.stringify(response)}`));
    res.status(statusCode).send(response);
}
