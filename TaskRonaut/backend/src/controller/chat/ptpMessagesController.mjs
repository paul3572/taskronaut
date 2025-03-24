import {findUserBySessionId} from "../../middleware/session.mjs";
import {errorHandler} from "../../middleware/errorHandler.js";
import {PermissionDeniedError} from "../../middleware/errors.mjs";
import psAuthentication from "../../database/preparedStatements/psAuthentication.mjs";
import psPtPMessages from "../../database/preparedStatements/psPtPMessages.mjs";
import logger from "../../middleware/logger.mjs";
import chalk from "chalk";
import {styles} from "../../database/loggingStyle.mjs";

class PtpMessagesController {
    async send(sessionId, otherUserEmail, message) {
        const myUserId = await findUserBySessionId(sessionId);
        const otherUser = await psAuthentication.getUserIdByEmail(otherUserEmail);
        const otherUserId = otherUser.id;
        logger.debug(chalk.hex(styles.debug)(`My User-ID: ${myUserId}, Other User-ID: ${otherUserId}, Message: ${message}`));
        await psPtPMessages.insertNewMessage(myUserId, otherUserId, message);
        return {statusCode: 201};
    }

    async view(sessionId, otherUserEmail) {
        const myUserId = await findUserBySessionId(sessionId);
        const otherUser = await psAuthentication.getUserIdByEmail(otherUserEmail);
        const otherUserId = otherUser.id;
        logger.debug(chalk.hex(styles.debug)(`My User-ID: ${myUserId}, Other User-ID: ${otherUserId}`));
        const result = await psPtPMessages.getMessages(myUserId, otherUserId);
        return {statusCode: 200, data: result};
    }

    async delete(sessionId, messageId) {
        const myUserId = await findUserBySessionId(sessionId);
        const isUserAuthor = await psPtPMessages.isUserAuthor(myUserId, messageId);
        if (isUserAuthor?.senderID === myUserId) {
            await psPtPMessages.deleteMessage(messageId);
            return {statusCode: 200};
        } else {
            throw new PermissionDeniedError("You are not the author of this message");
        }
    }
}

export default new PtpMessagesController();