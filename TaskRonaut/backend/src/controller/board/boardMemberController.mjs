import psBoardMember from "../../database/preparedStatements/psBoardMember.mjs";
import psAuthentication from "../../database/preparedStatements/psAuthentication.mjs";
import logger from "../../middleware/logger.mjs";
import chalk from "chalk";
import {styles} from "../../database/loggingStyle.mjs";
import psSession from "../../database/preparedStatements/psSession.mjs";
import {errorHandler} from "../../middleware/errorHandler.js";
import {UserIsAlreadyMemberError} from "../../middleware/errors.mjs";


class BoardMemberController {

    async getAllBoardMembers(sessionId, boardId) {
        try {
            const myUserId = await psSession.getUserIdFromSessionId(sessionId);
            if (myUserId !== null || undefined) {
                const result = await psBoardMember.selectAllBoardMembersId(boardId);

                if (result !== undefined) {
                    logger.debug(chalk.hex(styles.debug)`Issued Ids: " + ${JSON.stringify(result[0])}`);
                    let userIDs = result.map(item => item.userID);
                    let userList = [];

                    for (let id of userIDs) {
                        let user = await psAuthentication.getUserById(id);
                        userList.push(user);
                    }
                    logger.debug(chalk.hex(styles.debug)`All Board Members: " + ${JSON.stringify(userList)}`);
                    logger.info(chalk.hex(styles.success)`All Board Members ready for return`);
                    return {statusCode: 200, data: userList};
                } else {
                    logger.error(chalk.hex(styles.critical)`ERROR: " + ${result[0]}`);
                    throw new Error("Bitte implementieren");
                }
            }
        } catch (error) {
            return await errorHandler(error);
        }
    }

    async createNewBoardMember(userId, boardId) {
        try {
            const result = await psBoardMember.insertNewBoardMembers(userId, boardId);
            logger.debug(chalk.hex(styles.debug)`User added to Board: ${result[0]}`);
            logger.info(chalk.hex(styles.success)`User added to Board successfully!`);
            return {statusCode: 201, data: result[0]};
        } catch (error) {
            return await errorHandler(error);
        }
    }

    async addMemberToBoard(sessionId, boardId, email) {
        try {
            const myUserId = await psSession.getUserIdFromSessionId(sessionId);
            console.log("MyUserId: " + JSON.stringify(myUserId.userId));
            const issuerBoardEntry = await psBoardMember.getBoardUserEntries(myUserId.userId, boardId);
            console.log("IssuerBoardEntry: " + JSON.stringify(issuerBoardEntry));
            if (issuerBoardEntry === null || issuerBoardEntry === undefined) {
                throw new Error("Issuing User is not allowed to board");
            }
            // TODO: Check if userToAdd is already in board
            const userToAdd = await psAuthentication.getUserIdByEmail(email);
            console.log("UserToAdd: " + JSON.stringify(userToAdd));
            const userToAddEntry = await psBoardMember.getBoardUserEntries(userToAdd.id, boardId);
            if (userToAddEntry === null || userToAddEntry === undefined) {
                const result = await psBoardMember.insertNewBoardMembers(userToAdd.id, boardId);
                logger.debug(chalk.hex(styles.debug)`User added to Board: ${result}`);
                return {statusCode: 201, data: result};
            } else {
                throw new UserIsAlreadyMemberError();
            }
        } catch (error) {
            return await errorHandler(error);
        }
    }

    async removeBoardMember(userId) {
        try {
            const result = await psBoardMember.deleteBoardMembers(userId);
            logger.info(chalk.hex(styles.success)`User with id ${userId} deleted successfully`);
            return {statusCode: 200, message: `User with id ${userId} deleted successfully`};
        } catch (error) {
            return await errorHandler(error);
        }
    }
}

export default new BoardMemberController();