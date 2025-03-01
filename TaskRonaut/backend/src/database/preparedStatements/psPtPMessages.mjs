import connection from "../dbCon.mjs";
import {boardMessageQueries, p2pMessageQueries} from "../dbQueries.mjs";
import {NoMessagesFoundError} from "../../middleware/errors.mjs";

class psPtPMessages {
    async insertNewMessage(myUserId, otherUser, message) {
        const [result] = await connection.query(p2pMessageQueries.createMessage, [myUserId, otherUser, message]);
        if (result !== null) {
            return result;
        } else {
            throw new Error();
        }
    }

    async getMessages(myUserId, otherUser) {
        const [sentMessages] = await connection.query(p2pMessageQueries.getMessagesByUsers, [myUserId, otherUser]);
        const [receivedMessages] = await connection.query(p2pMessageQueries.getMessagesByUsers, [otherUser, myUserId]);
        console.log(JSON.stringify("Array: "[sentMessages, receivedMessages]));
        return [sentMessages, receivedMessages];
    }

    async deleteMessage(messageId) {
        const [result] = await connection.query(p2pMessageQueries.deleteMessage, [messageId]);
        if (result !== null) {
            return result;
        }
        throw new Error();
    }
    async isUserAuthor(myUserId, messageId) {
        const [result] = await connection.query(p2pMessageQueries.isUserAuthor, [myUserId, messageId]);
        if (result !== null) {
            return result[0];
        }
        throw new Error();
    }
}

export default new psPtPMessages();