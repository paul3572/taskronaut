import dbConnection from "../dbCon.mjs";
import {boardMemberQueries, boardQueries, listQueries, taskQueries} from "../dbQueries.mjs";
import logger from "../../middleware/logger.mjs";
import {
    BoardNotFoundError,
    InvalidBoardMemberDataError,
    NoBoardsFoundError,
    QueryExecutionError
} from "../../middleware/errors.mjs";
import chalk from "chalk";
import {styles} from "../loggingStyle.mjs";

class PsBoard {
    async selectAllUserBoards(userId) {
        let boardIds;
        try {
             [boardIds] = await dbConnection.query(boardMemberQueries.getBoardMemberByUserId, [userId]);
            logger.info(chalk.hex(styles.success)('Board-Ids: ' + JSON.stringify(boardIds)));
        } catch (queryError) {
            throw new QueryExecutionError(boardMemberQueries.getBoardMemberByUserId, [userId], queryError);
        }
        if (!boardIds) {
            // bin mir nicht sicher ob das bei 0 boards auch anschlägt
            //throw new UserNotFoundError(userId);
        }
        if (boardIds.length === 0) {
            //throw new NoBoardsFoundError(userId);
        }
        let boards = [];
        for (let boardId of boardIds) {
            if (!boardId || !boardId.boardID) {
                throw new InvalidBoardMemberDataError("Ungültige Board-Mitgliedsdaten.");
            }
            let board;
            try {
                [board] = await dbConnection.query(boardQueries.getBoardById, [boardId.boardID]);
            } catch (queryError) {
                throw new QueryExecutionError(boardQueries.getBoardById, [boardId.boardID], queryError);
            }
            if (!board || board.length === 0) {
                throw new BoardNotFoundError(boardId.boardID);
            }
            boards.push(board);
            logger.info(chalk.hex(styles.success)('Boards: ' + JSON.stringify(boards)));
        }
        return boards;
    }


    async insertNewBoard(boardName) {
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

    async updateBoard() {
    }

    async deleteBoard(boardId) {
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
}

export default new PsBoard();