import dbConnection from "../dbCon.mjs";
import {boardMemberQueries} from "../dbQueries.mjs";
import connection from "../dbCon.mjs";
import logger from "../../middleware/logger.mjs";
import chalk from "chalk";
import {styles} from "../../database/loggingStyle.mjs";

export async function selectAllBoardMembersId(boardId) {
    try {
        const [boardMembers] = await dbConnection.query(boardMemberQueries.getAllBoardMembers, [boardId]);
        return boardMembers;
    } catch (error) {

        return [error, false];
    }
}

export async function isUserAllowedToBoard(userId, boardId) {
    const boardLists = await selectAllBoardMembersId(boardId);

    for (let boardList of boardLists) {
        console.log(boardList);
        if (boardList.userID === userId && boardList.boardID === boardId) {

            logger.info(chalk.hex(styles.success)(`User ${userId} is allowed to board ${boardId}`));
            return true;
        }
    }
    logger.error(chalk.hex(styles.critical)+`User ${userId} is not allowed to board ${boardId}`);

}

export async function insertNewBoardMembers(userId, boardId) {
    try {
        const [result] = await dbConnection.query(boardMemberQueries.insertBoardMember, [userId, boardId]);
        return [result, true];
    } catch (error) {
        return [error, false];
    }
}

export async function updateBoardMembers() {
}

export async function deleteBoardMembers(userId) {
    try {
        const [rows] = await connection.query(boardMemberQueries.getBoardMemberByUserId, [userId]);
        if (rows.affectedRows === 0) {
            return [`No board members found for user with ID ${userId}`, 1];
        }
        await connection.query(boardMemberQueries.deleteBoardMemberById, [userId]);
        return [null, 0];
    } catch (error) {
        logger.error("Database Error:", error);
        return [error, 2];
    }
}


