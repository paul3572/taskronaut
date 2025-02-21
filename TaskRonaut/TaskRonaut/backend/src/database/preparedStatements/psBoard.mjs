import dbConnection from "../dbCon.mjs";
import {boardMemberQueries, boardQueries, listQueries, taskQueries} from "../dbQueries.mjs";
import logger from "../../middleware/logger.mjs";

export async function selectAllUserBoards(userId) {
    try {
        const [boardIds] = await dbConnection.query(boardMemberQueries.getBoardMemberByUserId, [userId]);
        console.log(JSON.stringify(boardIds));
        let boards = [];

        for (let boardId of boardIds) {
            console.log(JSON.stringify(boardId?.boardID));
            const [board] = await dbConnection.query(boardQueries.getBoardById, [boardId.boardID]);
            boards.push(board);
        }

        return [boards, true];
    } catch (error) {
        return [error, false];
    }
}


export async function insertNewBoard(boardName) {
    try {
        const [result] = await dbConnection.query(boardQueries.insertBoard, [boardName]);
        if (result !== null) {
            return [result, 0];
        }
        return [null, 1];
    } catch (error) {
        return [error, 2];
    }
}

export async function updateBoard() {
}

export async function deleteBoard(boardId) {
    try {
        logger.info("Deleting tasks...");
        const [tasksResult] = await dbConnection.query(taskQueries.deleteTasksByBoardId, [boardId]);
        console.log(`Deleted ${tasksResult.affectedRows} task(s) related to the list`);

        logger.info("Deleting board members...");
        const [membersResult] = await dbConnection.query(boardMemberQueries.deleteBoardMemberByBoardId, [boardId]);
        logger.info(`Deleted ${membersResult.affectedRows} member(s) related to the board`);

        logger.info("...deleting lists...");
        const [taskboardlists] = await dbConnection.query(taskQueries.deleteTaskbyBoardList, [boardId]);
        logger.info(`Deleted ${taskboardlists.affectedRows} list(s) related to the list`);

        logger.info("...deleting lists...");
        const [listResult] = await dbConnection.query(listQueries.deleteListByBoardId, [boardId]);
        logger.info(`Deleted ${listResult.affectedRows} list(s) related to the list`);

        logger.info("...deleting boards");
        const [boardResult] = await dbConnection.query(boardQueries.deleteBoardById, [boardId]);
        logger.info(`Deleted ${tasksResult.affectedRows} task(s) related to the list`);
        if (boardResult.affectedRows === 0) {
            logger.info('BoardId not found');
            return [null, 1];
        } else {
            return [boardResult, 0]
        }
    } catch (error) {
        logger.error("DATENBANKFEHLER: " + error.message);
        return [error, 2];
    }
}