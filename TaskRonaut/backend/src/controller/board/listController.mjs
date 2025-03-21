import psList from "../../database/preparedStatements/psList.mjs";
import psAuthentication from "../../database/preparedStatements/psAuthentication.mjs";
import psBoardMember from "../../database/preparedStatements/psBoardMember.mjs";
import {errorHandler} from "../../middleware/errorHandler.js";
import {PermissionDeniedError, UserNotFoundError} from "../../middleware/errors.mjs";
import {findUserBySessionId} from "../../middleware/session.mjs";

class ListController {
    async listRequest() {
        try {
            const result = await psList.selectAllLists();
            return {statusCode: 200, data: result[0]};
        } catch (exception) {
            return await errorHandler(exception);
        }

    }


    async listsForBoard(sessionId, boardId) {
        try {
            const userId = await psAuthentication.getUserIdBySessionId(sessionId);
            if (userId === null || undefined) {
                throw new UserNotFoundError("Benutzer mit der angegebenen Session-ID nicht gefunden.");
            }
            const isAllowed = await psBoardMember.isUserAllowedToBoard(userId, boardId);
            if (!isAllowed) {
                throw new PermissionDeniedError("Benutzer hat keine Berechtigung für diesen Board.");
            }
            const result = await psList.readListsFromBoard(boardId);
            return {statusCode: 200, data: result};
        } catch (exception) {
            return await errorHandler(exception);
        }
    }

    async createList(sessionId, boardId, listName) {
        try {
            const userId = await psAuthentication.getUserIdBySessionId(sessionId);
            if (userId == null) {
                throw new UserNotFoundError("Benutzer mit der angegebenen Session-ID nicht gefunden.");
            }
            const isAllowed = await psBoardMember.isUserAllowedToBoard(userId, boardId);
            if (!isAllowed) {
                throw new PermissionDeniedError("Benutzer hat keine Berechtigung für diesen Board.");
            }
            const result = await psList.insertList(listName, boardId);
            return {statusCode: 201};
        } catch (exception) {
            return await errorHandler(exception);
        }
    }

    async updateList(sessionId, listId, listName) {
        try {
            const myUserId = await findUserBySessionId(sessionId);
            const result = await psList.updateList(listId, listName);
            return {statusCode: 200};
        } catch (exception) {
            return await errorHandler(exception);
        }
    }

    async removeList(sessionId, listId) {
        try {
            const myUserId = await findUserBySessionId(sessionId);
            const boardId = await psList.selectBoardIdFromList(listId);
            const userToAddEntry = await psBoardMember.getBoardUserEntries(myUserId, boardId);
            if (userToAddEntry[0] === null || userToAddEntry[0] === undefined) {
                throw new PermissionDeniedError("User is not allowed to board");
            } else {
                const result = await psList.deleteList(listId);
                return {statusCode: 200};
            }
        } catch (exception) {
            return await errorHandler(exception);
        }
    }
}

export default new ListController();