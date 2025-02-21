import {
    deleteList,
    insertList,
    readListsFromBoard,
    selectAllLists,
} from "../../database/preparedStatements/psList.mjs";
import {getUserIdBySessionId} from "../../database/preparedStatements/psAuthentication.mjs";
import {isUserAllowedToBoard} from "../../database/preparedStatements/psBoardMember.mjs";

export async function listRequest() {
    const result = await selectAllLists();
    switch (result[1]) {
        case true:
            return {statusCode: 200, data: result[0]};
        case false:
            return {statusCode: 500};
        default:
            return {statusCode: 500};
    }
}


export async function listsForBoard(sessionId, boardId) {
    const userId = await getUserIdBySessionId(sessionId);
    console.log("userid"+userId);
    if (userId === null|| undefined) {
        return {statusCode: 404};
    }
    const isAllowed = await isUserAllowedToBoard(userId, boardId);
    if (!isAllowed) {
        return {statusCode: 403};
    }
    const result = await readListsFromBoard(boardId);
    switch (result[1]) {
        case true:
            return {statusCode: 200, data: result[0]};
        case false:
            return {statusCode: 500};
        default:
            return {statusCode: 500};
    }
}

export async function createList(sessionId, boardId, listName) {
    const userId = await getUserIdBySessionId(sessionId);
    console.log(userId);
    if (userId == null) {
        return {statusCode: 404};
    }
    const isAllowed = await isUserAllowedToBoard(userId, boardId);
    console.log(isAllowed);
    if (!isAllowed) {
        return {statusCode: 403};
    }
    const result = await insertList(listName, boardId);
    console.log(sessionId)
    switch (result[1]) {
        case true:
            return {statusCode: 201};
        case false:
            return {statusCode: 500};
        default:
            return {statusCode: 500};
    }
}

export async function updateList(listId, listName) {
}

export async function removeList(listId) {
    const result = await deleteList(listId);
    switch (result[1]) {
        case 0:
            return {statusCode: 200};
        case 1:
            return {statusCode: 404};
        case 2:
            return {statusCode: 500};
        default:
            return {statusCode: 500};
    }
}
