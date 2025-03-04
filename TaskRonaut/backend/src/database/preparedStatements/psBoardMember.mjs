import dbConnection from "../dbCon.mjs";
import {boardMemberQueries} from "../dbQueries.mjs";
import connection from "../dbCon.mjs";
import logger from "../../middleware/logger.mjs";
import chalk from "chalk";
import {styles} from "../../database/loggingStyle.mjs";
import {UserNotFoundError} from "../../middleware/errors.mjs";


class PsBoardMember {
    async selectAllBoardMembersId(boardId) {
        const [boardMembers] = await dbConnection.query(boardMemberQueries.getAllBoardMembers, [boardId]);
        return boardMembers;

    }

    async isUserAllowedToBoard(userId, boardId) {
        const boardLists = await this.selectAllBoardMembersId(boardId);
        for (let boardList of boardLists) {
            if (boardList.userID === userId && boardList.boardID === boardId) {
                logger.info(chalk.hex(styles.success)(`User ${userId} is allowed to board ${boardId}`));
                return true;
            }
        }
        logger.error(chalk.hex(styles.critical) + `User ${userId} is not allowed to board ${boardId}`);
        return false;
    }

    async insertNewBoardMembers(userId, boardId) {
        const [result] = await dbConnection.query(boardMemberQueries.insertBoardMember, [userId, boardId]);
        //TODO: Insert boardmember to chatmember
        return result;
    }


    async deleteBoardMembers(userId) {
        const [rows] = await connection.query(boardMemberQueries.getBoardMemberByUserId, [userId]);
        if (rows.affectedRows === 0) {
            throw new UserNotFoundError(`No board members found for user with ID ${userId}`);
        }
        await connection.query(boardMemberQueries.deleteBoardMemberById, [userId]);
        //TODO: Delete member from chat member
        return null;
    }

    async getBoardUserEntries(userId, boardId) {
        const [rows] = await connection.query(boardMemberQueries.selectBoardUserEntries, [userId, boardId]);
        return rows;
    }
}

export default new PsBoardMember();
