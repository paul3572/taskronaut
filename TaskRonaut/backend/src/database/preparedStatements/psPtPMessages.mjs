import connection from "../dbCon.mjs";
import {authenticationQueries, p2pMessageQueries} from "../dbQueries.mjs";
import psAuthentication from "./psAuthentication.mjs";

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
        let returnMessagesS = [];
        for (const sentMessage of sentMessages) {
            let messageId = sentMessage.messageID;
            let message = sentMessage.message;
            let userIdSender = sentMessage.senderID;
            let userIdReceiver = sentMessage.reciverID;
            let timestamp = sentMessage.timestamp;

            const userSender = await psAuthentication.getUserById(userIdSender);
            const userReceiver = await psAuthentication.getUserById(userIdReceiver);
            console.log(userSender);
            console.log(userReceiver);

            const senderName = userSender.firstName + " " + userSender.lastName;
            const receiverName = userReceiver.firstName + " " + userReceiver.lastName;

            returnMessagesS.push({
                messageID: messageId,
                message: message,
                senderID: senderName,
                reciverID: receiverName,
                timestamp: timestamp
            });
        }
        const [receivedMessages] = await connection.query(p2pMessageQueries.getMessagesByUsers, [otherUser, myUserId]);
        let returnMessagesR = [];
        for (const returnMessage of receivedMessages) {
            let messageId = returnMessage.messageID;
            let message = returnMessage.message;
            let userIdSender = returnMessage.senderID;
            let userIdReceiver = returnMessage.reciverID;
            let timestamp = returnMessage.timestamp;

            const userSender = await psAuthentication.getUserById(userIdSender);
            const userReceiver = await psAuthentication.getUserById(userIdReceiver);

            const senderName = userSender.firstName + " " + userSender.lastName;
            const receiverName = userReceiver.firstName + " " + userReceiver.lastName;

            returnMessagesR.push({
                messageID: messageId,
                message: message,
                senderID: senderName,
                reciverID: receiverName,
                timestamp: timestamp
            });
        }
        console.log(JSON.stringify(returnMessagesS));
        return [returnMessagesS, returnMessagesR];
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