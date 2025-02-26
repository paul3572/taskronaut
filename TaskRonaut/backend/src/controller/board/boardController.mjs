import {insertNewBoard, deleteBoard, selectAllUserBoards} from "../../database/preparedStatements/psBoard.mjs";
import logger from "../../middleware/logger.mjs";
import chalk from "chalk";
import {styles} from "../../database/loggingStyle.mjs";
import {findUserBySessionId} from "../../middleware/session.mjs";
import {insertNewBoardMembers} from "../../database/preparedStatements/psBoardMember.mjs";



export async function boardRequest(sessionId) {
    const userId = await findUserBySessionId(sessionId);
    const result = await selectAllUserBoards(userId);
    switch (result[1]) {
        case true:
            logger.info(chalk.hex(styles.success)('Boards successfully loaded'));
            return {statusCode: 200, data: result[0]};
        case false:
            logger.error(chalk.hex(styles.critical)`DATABASE ERROR: ${result[0]}`);
            return {statusCode: 500};
        default:
            logger.error(chalk.hex(styles.critical)`ERROR`);
            return {statusCode: 500};
    }
}

export async function addBoard(boardName, sessionId) {
    const userId = await findUserBySessionId(sessionId);

    // TODO: Add authorisation to Boardcreator
    const result = await insertNewBoard(boardName);
    const boardId = result[0].insertId;
    switch (result[1]) {
        case 0:
            logger.info(chalk.hex(styles.success)('Boards successfully added'));
            console.log("result[0].insertId: " + boardId);
            await insertNewBoardMembers(userId, boardId);
            return {statusCode: 200, data: result[0]};
        case 1:
            logger.error(chalk.hex(styles.critical)`ERROR?: ${result[0]}`);
            return {statusCode: 500, data: result[0]};
        case 2:
            logger.error(chalk.hex(styles.critical)`DATABASE ERROR: ${result[0]}`);
            return {statusCode: 500};
        default:
            logger.error(chalk.hex(styles.critical)`ERROR`);
            return {statusCode: 500};
    }
}

export async function removeBoard(boardId) {
    const result = await deleteBoard(boardId);
    switch (result[1]) {
        case 0:
            logger.info(chalk.hex(styles.success)`Board mit ID ${boardId} erfolgreich entfernt`);
            return {statusCode: 200};
        case 1:
            logger.info(`Board with Id ${boardId} not found`);
            return {statusCode: 404, message: `Board mit Id ${boardId} not found`};
        case 2:
            logger.error(`DATABASE ERROR: ${result[0]}`);
            return {statusCode: 500};
        default:
            logger.error(`ERROR`);
            return {statusCode: 500};
    }
}

