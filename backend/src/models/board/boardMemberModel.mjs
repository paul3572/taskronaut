import dbConnection from "../../database/dbCon.mjs";
import {boardMemberQueries} from "../../database/dbQueries.mjs";
import connection from "../../database/dbCon.mjs";
import logger from "../../middleware/logger.mjs";
import chalk from "chalk";
import {styles} from "../../database/loggingStyle.mjs";
import {UserNotFoundError} from "../../database/errors.mjs";


class BoardMemberModel {
    async selectAllBoardMembersId(boardId) {
        const [boardMembers] = await dbConnection.query(boardMemberQueries.selectAllBoardMembers, [boardId]);
        return boardMembers;

    }

    async getUserAllowedToBoardStatus(userId, boardId) {
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

    async createNewBoardMember(userId, boardId) {
        const [result] = await dbConnection.query(boardMemberQueries.insertBoardMember, [userId, boardId]);
        //TODO: Insert boardmember to chatmember
        return result;
    }


    async deleteBoardMember(userId, boardId) {
        await connection.query(boardMemberQueries.deleteBoardMemberById, [userId, boardId]);
        //TODO: Delete member from chat member
        return null;
    }

    async getUserEntriesInBoard(userId, boardId) {
        const [rows] = await connection.query(boardMemberQueries.selectBoardUserEntries, [userId, boardId]);
        return rows;
    }
}

export default new BoardMemberModel();
