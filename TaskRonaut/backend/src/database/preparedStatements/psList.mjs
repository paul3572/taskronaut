import dbConnection from "../dbCon.mjs";
import {listQueries, taskQueries} from "../dbQueries.mjs";
import logger from "../../middleware/logger.mjs";

class PsList {
    async selectAllLists() {
        const [lists] = await dbConnection.query(listQueries.getLists);
        return lists;
    }

    async readListsFromBoard(boardId) {
        //TODO: Check if boardId exists
        const [lists] = await dbConnection.query(listQueries.readListsFromBoard, [boardId]);
        return lists;
    }

    async insertList(listName, boardId) {
        const [result] = await dbConnection.query(listQueries.createList, [listName, boardId]);
        return result;
    }

    async updateList(listId, listName) {
        const [tasksResult] = await dbConnection.query(listQueries.updateList, [listName, listId]);
        return tasksResult;
    }

    async deleteList(listId) {
        const [tasksResult] = await dbConnection.query(taskQueries.deleteTasksByListId, [listId]);
        logger.info(`Deleted ${tasksResult.affectedRows} task(s) related to the list`);
        const [result] = await dbConnection.query(listQueries.deleteListById, [listId]);
        if (result.affectedRows === 0) {
            throw new Error('ListId not found');
        } else {
            return result;
        }
    }
    async selectBoardIdFromList(listId) {
        const [boardId] = await dbConnection.query(listQueries.getBoardIdFromList, [listId]);
        if (boardId.length === 0) {
            throw new Error('ListId not found');
        } else {
            console.log("BOARD ID FROM LIST:"+JSON.stringify(boardId));
            console.log("BOARD ID FROM LIST:"+JSON.stringify(boardId.boardID));
            return boardId;
        }
    }
}

export default new PsList();