import {
    deleteBoardMembers,
    insertNewBoardMembers,
    selectAllBoardMembersId
} from "../../database/preparedStatements/psBoardMember.mjs";
import {getUserById, getUserIdByEmail} from "../../database/preparedStatements/psAuthentication.mjs";
import logger from "../../middleware/logger.mjs";
import chalk from "chalk";
import {styles} from "../../database/loggingStyle.mjs";
import {getUserIdFromSessionId} from "../../database/preparedStatements/psSession.mjs";

export async function getAllBoardMembers(sessionId, boardId) {
    const myUserId = await getUserIdFromSessionId(sessionId);
    if (myUserId !== null || undefined) {
        const result = await selectAllBoardMembersId(boardId);

        if (result !== undefined) {
            logger.debug(chalk.hex(styles.debug)`Issued Ids: " + ${JSON.stringify(result[0])}`);
            let userIDs = result.map(item => item.userID);
            let userList = [];

            for (let id of userIDs) {
                let user = await getUserById(id);
                userList.push(user);
            }
            logger.debug(chalk.hex(styles.debug)`All Board Members: " + ${JSON.stringify(userList)}`);
            logger.info(chalk.hex(styles.success)`All Board Members ready for return`);
            return {statusCode: 200, data: userList};
        } else {
            logger.error(chalk.hex(styles.critical)`ERROR: " + ${result[0]}`);
            return {statusCode: 500};
        }
    }
}

export async function createNewBoardMember(userId, boardId) {

    const result = await insertNewBoardMembers(userId, boardId);
    switch (result[1]) {
        case true:
            logger.debug(chalk.hex(styles.debug)`User added to Board: ${result[0]}`);
            logger.info(chalk.hex(styles.success)`User added to Board successfully!`);
            return {statusCode: 201, data: result[0]};
        case false:
            logger.error(chalk.hex(styles.critical)`DATABASE-ERROR: " + ${result[0]}`);
            return {statusCode: 500, data: result[1]};
        default:
            logger.error(chalk.hex(styles.critical)`ERROR: " + ${result[0]}`);
            return {statusCode: 500};
    }
}
export async function addMemberToBoard(sessionId, boardId, email) {
    const myUserId = await getUserIdFromSessionId(sessionId);
    //find user by email
    const userId = await getUserIdByEmail(email);
    console.log("UID: "userId);

    const result = await insertNewBoardMembers(userId, boardId);
    switch (result[1]) {
        case true:
            logger.debug(chalk.hex(styles.debug)`User added to Board: ${result[0]}`);
            logger.info(chalk.hex(styles.success)`User added to Board successfully!`);
            return {statusCode: 201, data: result[0]};
        case false:
            logger.error(chalk.hex(styles.critical)`DATABASE-ERROR: " + ${result[0]}`);
            return {statusCode: 500, data: result[1]};
        default:
            logger.error(chalk.hex(styles.critical)`ERROR: " + ${result[0]}`);
            return {statusCode: 500};
    }
}

export async function removeBoardMember(userId) {
    const result = await deleteBoardMembers(userId);
    switch (result[1]) {
        case 0:
            logger.info(chalk.hex(styles.success)`User with id ${userId} deleted successfully`);
            return {statusCode: 200, message: `User with id ${userId} deleted successfully`};
        case 1:
            logger.error(chalk.hex(styles.critical)`No board members found for user with ID ${userId}`);
            return {statusCode: 404, message: result[0]};
        case 2:
            logger.error(chalk.hex(styles.critical)`DATABASE-ERROR: " + ${result[0]}`);
            return {statusCode: 500};
        default:
            logger.error(chalk.hex(styles.critical)`ERROR: " + ${result[0]}`);
            return {statusCode: 500};
    }
}