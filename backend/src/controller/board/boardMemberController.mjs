import boardMemberModel from "../../models/board/boardMemberModel.mjs";
import authenticationModel from "../../models/authentication/authenticationModel.mjs";
import logger from "../../middleware/logger.mjs";
import chalk from "chalk";
import {styles} from "../../config/loggingStyle.mjs";
import sessionModel from "../../models/authentication/sessionModel.mjs";
import {PermissionDeniedError, UserIsAlreadyMemberError, UserNotFoundError} from "../../config/errors.mjs";


class BoardMemberController {

    async handleAllBoardMemberRequest(sessionId, boardId) {
        const myUserId = await sessionModel.getUserIdFromSessionId(sessionId);
        if (myUserId !== null || undefined) {
            const result = await boardMemberModel.selectAllBoardMembersId(boardId);

            if (result !== undefined) {
                logger.debug(chalk.hex(styles.debug)`Issued Ids: " + ${JSON.stringify(result[0])}`);
                let userIDs = result.map(item => item.userID);
                let userList = [];

                for (let id of userIDs) {
                    let user = await authenticationModel.getUserById(id);
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
    }

    async handleNewBoardMember(sessionId, boardId, email) {
        const myUserId = await sessionModel.getUserIdFromSessionId(sessionId);
        const issuerBoardEntry = await boardMemberModel.getUserEntriesInBoard(myUserId.userId, boardId);
        if (issuerBoardEntry[0] === null || issuerBoardEntry[0] === undefined) {
            throw new PermissionDeniedError("Issuing User is not allowed to board");
        }
        const userToAdd = await authenticationModel.getUserIdByEmail(email);
        const userToAddEntry = await boardMemberModel.getUserEntriesInBoard(userToAdd.id, boardId);
        if (userToAddEntry[0] === null || userToAddEntry[0] === undefined) {
            const result = await boardMemberModel.createNewBoardMember(userToAdd.id, boardId);
            logger.debug(chalk.hex(styles.debug)`User added to Board: ${result}`);
            //TODO: Add user to board chat
            return {statusCode: 201, data: result};
        } else {
            throw new UserIsAlreadyMemberError();
        }
    }

    async handleBoardMemberRemovalRequest(sessionId, boardId, email) {
        const myUserId = await sessionModel.getUserIdFromSessionId(sessionId);
        const issuerBoardEntry = await boardMemberModel.getUserEntriesInBoard(myUserId.userId, boardId);
        if (issuerBoardEntry[0] === null || issuerBoardEntry[0] === undefined) {
            throw new Error("Issuing User is not allowed to board");
        }

        const userToDelete = await authenticationModel.getUserIdByEmail(email);
        const userToDeleteEntry = await boardMemberModel.getUserEntriesInBoard(userToDelete.id, boardId);
        if (userToDeleteEntry[0] === null || userToDeleteEntry[0] === undefined) {
            throw new UserNotFoundError(`User with email ${email} is not a member of board with id ${boardId}`);
        } else {
            const result = await boardMemberModel.deleteBoardMember(userToDelete.id, boardId);
            logger.info(chalk.hex(styles.success)`User with email ${email} deleted successfully`);
            //TODO: Add Chat member
            return {statusCode: 200, message: `User with email ${email} deleted successfully`};
        }
    }
}

export default new BoardMemberController();