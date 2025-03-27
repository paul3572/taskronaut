import {findUserBySessionId} from "../../middleware/session.mjs";
import {errorHandler} from "../../middleware/errorHandler.js";
import {PermissionDeniedError} from "../../database/errors.mjs";
import psAuthentication from "../../models/authentication/authenticationModel.mjs";
import ptPMessagesModel from "../../models/chat/ptPMessagesModel.mjs";
import logger from "../../middleware/logger.mjs";
import chalk from "chalk";
import {styles} from "../../database/loggingStyle.mjs";

class PtpMessagesController {
    async sendMessage(sessionId, otherUserEmail, message) {
        const myUserId = await findUserBySessionId(sessionId);
        const otherUser = await psAuthentication.getUserIdByEmail(otherUserEmail);
        const otherUserId = otherUser.id;
        logger.debug(chalk.hex(styles.debug)(`My User-ID: ${myUserId}, Other User-ID: ${otherUserId}, Message: ${message}`));
        await ptPMessagesModel.createNewMessage(myUserId, otherUserId, message);
        return {statusCode: 201};
    }

    async viewMessage(sessionId, otherUserEmail) {
        const myUserId = await findUserBySessionId(sessionId);
        const otherUser = await psAuthentication.getUserIdByEmail(otherUserEmail);
        const otherUserId = otherUser.id;
        logger.debug(chalk.hex(styles.debug)(`My User-ID: ${myUserId}, Other User-ID: ${otherUserId}`));
        const result = await ptPMessagesModel.getMessages(myUserId, otherUserId);
        return {statusCode: 200, data: result};
    }

    async deleteMessage(sessionId, messageId) {
        const myUserId = await findUserBySessionId(sessionId);
        const isUserAuthor = await ptPMessagesModel.getIsUserAuthorStatus(myUserId, messageId);
        if (isUserAuthor?.senderID === myUserId) {
            await ptPMessagesModel.deleteMessage(messageId);
            return {statusCode: 200};
        } else {
            throw new PermissionDeniedError("You are not the author of this message");
        }
    }
}

export default new PtpMessagesController();