import psBoardMember from "../../database/preparedStatements/psBoardMember.mjs";
import psAuthentication from "../../database/preparedStatements/psAuthentication.mjs";
import logger from "../../middleware/logger.mjs";
import chalk from "chalk";
import {styles} from "../../database/loggingStyle.mjs";
import psSession from "../../database/preparedStatements/psSession.mjs";
import {errorHandler} from "../../middleware/errorHandler.js";
import {UserIsAlreadyMemberError, UserNotFoundError} from "../../middleware/errors.mjs";


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
            const issuerBoardEntry = await psBoardMember.getBoardUserEntries(myUserId.userId, boardId);
            if (issuerBoardEntry[0] === null || issuerBoardEntry[0] === undefined) {
                throw new Error("Issuing User is not allowed to board");
            }
            const userToAdd = await psAuthentication.getUserIdByEmail(email);
            const userToAddEntry = await psBoardMember.getBoardUserEntries(userToAdd.id, boardId);
            if (userToAddEntry[0] === null || userToAddEntry[0] === undefined) {
                const result = await psBoardMember.insertNewBoardMembers(userToAdd.id, boardId);
                logger.debug(chalk.hex(styles.debug)`User added to Board: ${result}`);
                //TODO: Add user to board chat
                return {statusCode: 201, data: result};
            } else {
                throw new UserIsAlreadyMemberError();
            }
        } catch (error) {
            return await errorHandler(error);
        }
    }

    async removeBoardMember(sessionId, boardId, email) {
        try {
            const myUserId = await psSession.getUserIdFromSessionId(sessionId);
            const issuerBoardEntry = await psBoardMember.getBoardUserEntries(myUserId.userId, boardId);
            if (issuerBoardEntry[0] === null || issuerBoardEntry[0] === undefined) {
                throw new Error("Issuing User is not allowed to board");
            }

            const userToDelete = await psAuthentication.getUserIdByEmail(email);
            const userToDeleteEntry = await psBoardMember.getBoardUserEntries(userToDelete.id, boardId);
            if (userToDeleteEntry[0] === null || userToDeleteEntry[0] === undefined) {
                throw new UserNotFoundError(`User with email ${email} is not a member of board with id ${boardId}`);
            } else {
                const result = await psBoardMember.deleteBoardMembers(userToDelete.id, boardId);
                logger.info(chalk.hex(styles.success)`User with email ${email} deleted successfully`);
                //TODO: Add Chat member
                return {statusCode: 200, message: `User with email ${email} deleted successfully`};
            }
        } catch (error) {
            return await errorHandler(error);
        }
    }
}

export default new BoardMemberController();