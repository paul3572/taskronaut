import dbConnection from "../dbCon.mjs";
import {listQueries, taskQueries} from "../dbQueries.mjs";
import logger from "../../middleware/logger.mjs";

export async function selectAllLists() {
    try {
        const [lists] = await dbConnection.query(listQueries.getLists);
        return [lists, true];
    } catch (error) {
        logger.error("DATENBANKFEHLER: " + error.message);
        return [error, false];
    }
}

export async function readListsFromBoard(boardId) {
    try {
        //TODO: Check if boardId exists
        const [lists] = await dbConnection.query(listQueries.readListsFromBoard, [boardId]);
        return [lists, true];
    } catch (error) {
        logger.error("DATENBANKFEHLER: " + error);
        return [error, false];
    }
}

export async function insertList(listName, boardId) {
    try {
        const [result] = await dbConnection.query(listQueries.createList, [listName, boardId]);
        return [result, true];
    } catch (error) {
        logger.info("DATENBANKFEHLER: " + error.message);
        return [error, false];
    }
}

export async function updateList(listId, listName) {
}

export async function deleteList(listId) {
    try {
        const [tasksResult] = await dbConnection.query(taskQueries.deleteTasksByListId, [listId]);
        logger.info(`Deleted ${tasksResult.affectedRows} task(s) related to the list`);
        const [result] = await dbConnection.query(listQueries.deleteListById, [listId]);
        if (result.affectedRows === 0) {
            return [result, 1];
        } else {
            return [result, 0];
        }
    } catch (error) {
        logger.error("DATENBANKFEHLER: " + error.message);
        return [error, 2];
    }
}