import dbConnection from "../../database/dbCon.mjs";
import {listQueries, taskQueries} from "../../database/dbQueries.mjs";
import logger from "../../middleware/logger.mjs";

class ListModel {
    async getAllLists() {
        const [lists] = await dbConnection.query(listQueries.selectLists);
        return lists;
    }

    async getListsFromBoard(boardId) {
        //TODO: Check if boardId exists
        const [lists] = await dbConnection.query(listQueries.selectListsFromBoard, [boardId]);
        return lists;
    }

    async createList(listName, boardId) {
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

    async getBoardIdFromList(listId) {
        const [boardId] = await dbConnection.query(listQueries.selectBoardIdFromList, [listId]);
        if (boardId.length === 0) {
            throw new Error('ListId not found');
        } else {
            return boardId[0]?.boardID;
        }
    }
}

export default new ListModel();