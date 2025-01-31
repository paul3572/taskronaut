import {responseMessages} from "../database/responseMessages.mjs";

/**
 * Automated response generator
 *
 * @param res
 * @param statusCode Http-Statuscode
 * @param message Specific Http-Response-Message (if not given it uses the default response Messages)
 * @param data Data if requested by user (usually not needed because not wanted)
 * @returns {Promise<void>} Object with (default-)message and data (or null)
 */
export async function serverResponse(res, {statusCode, message = '', data = null}) {
    const responseMessage = message || responseMessages[statusCode] || responseMessages.default;

    const response = {
        message: responseMessage,
        data: data,
    };
    console.log(JSON.stringify(response));
    res.status(statusCode).send(response);
}
