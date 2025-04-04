import dbConnection from "../../database/dbCon.mjs";
import {boardMemberQueries, boardQueries, listQueries, taskQueries} from "../../database/dbQueries.mjs";
import logger from "../../middleware/logger.mjs";
import {
    BoardNotFoundError,
    InvalidBoardMemberDataError,
    NoBoardsFoundError,
    QueryExecutionError
} from "../../config/errors.mjs";
import chalk from "chalk";
import {styles} from "../../config/loggingStyle.mjs";

class BoardModel {
    async getAllUserBoards(userId) {
        let boardIds;
        try {
            [boardIds] = await dbConnection.query(boardMemberQueries.selectBoardMemberByUserId, [userId]);
            logger.info(chalk.hex(styles.success)('Board-Ids: ' + JSON.stringify(boardIds)));
        } catch (queryError) {
            throw new QueryExecutionError(boardMemberQueries.selectBoardMemberByUserId, [userId], queryError);
        }
        if (!boardIds) {
            // bin mir nicht sicher ob das bei 0 boards auch anschlägt
            //throw new UserNotFoundError(userId);
        }
        if (boardIds.length === 0) {
            throw new NoBoardsFoundError(userId);
        }
        let boards = [];
        for (let boardId of boardIds) {
            if (!boardId || !boardId.boardID) {
                throw new InvalidBoardMemberDataError("Ungültige Board-Mitgliedsdaten.");
            }
            let board;
            try {
                [board] = await dbConnection.query(boardQueries.selectBoardById, [boardId.boardID]);
            } catch (queryError) {
                throw new QueryExecutionError(boardQueries.selectBoardById, [boardId.boardID], queryError);
            }
            if (!board || board.length === 0) {
                throw new BoardNotFoundError(boardId.boardID);
            }
            boards.push(board);
            logger.info(chalk.hex(styles.success)('Boards: ' + JSON.stringify(boards)));
        }
        return boards;
    }


    async createNewBoard(boardName) {
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

    async updateBoard(boardId, boardName) {
        const [tasksResult] = await dbConnection.query(boardQueries.updateBoard, [boardName, boardId]);
        return tasksResult;
    }

    async deleteBoard(boardId) {
        logger.info("Deleting tasks...");
        const [tasksResult] = await dbConnection.query(taskQueries.deleteTasksByBoardId, [boardId]);
        logger.info(`Deleted ${tasksResult.affectedRows} task(s) related to the list`);

        logger.info("Deleting board members...");
        const [membersResult] = await dbConnection.query(boardMemberQueries.deleteBoardMemberByBoardId, [boardId]);
        logger.info(`Deleted ${membersResult.affectedRows} member(s) related to the board`);

        logger.info("...deleting lists...");
        const [taskBoardLists] = await dbConnection.query(taskQueries.deleteTaskByBoardList, [boardId]);
        logger.info(`Deleted ${taskBoardLists.affectedRows} list(s) related to the list`);

        logger.info("...deleting lists...");
        const [listResult] = await dbConnection.query(listQueries.deleteListByBoardId, [boardId]);
        logger.info(`Deleted ${listResult.affectedRows} list(s) related to the list`);

        logger.info("...deleting boards");
        const [boardResult] = await dbConnection.query(boardQueries.deleteBoardById, [boardId]);
        logger.info(`Deleted ${tasksResult.affectedRows} task(s) related to the list`);
        if (boardResult.affectedRows === 0) {
            logger.info('BoardId not found');
            throw new BoardNotFoundError(boardId);
        } else {
            return boardResult;
        }
    }
}

export default new BoardModel();