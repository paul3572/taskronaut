import listModel from "../../models/board/listModel.mjs";
import authenticationModel from "../../models/authentication/authenticationModel.mjs";
import boardMemberModel from "../../models/board/boardMemberModel.mjs";
import {PermissionDeniedError, UserNotFoundError} from "../../database/errors.mjs";
import {findUserBySessionId} from "../../middleware/session.mjs";

class ListController {
    async listRequest() {
        const result = await listModel.selectAllLists();
        return {statusCode: 200, data: result[0]};
    }


    async listsForBoard(sessionId, boardId) {
        const userId = await authenticationModel.getUserIdBySessionId(sessionId);
        if (userId === null || undefined) {
            throw new UserNotFoundError("Benutzer mit der angegebenen Session-ID nicht gefunden.");
        }
        const isAllowed = await boardMemberModel.isUserAllowedToBoard(userId, boardId);
        if (!isAllowed) {
            throw new PermissionDeniedError("Benutzer hat keine Berechtigung für diesen Board.");
        }
        const result = await listModel.readListsFromBoard(boardId);
        return {statusCode: 200, data: result};
    }

    async createList(sessionId, boardId, listName) {
        const userId = await authenticationModel.getUserIdBySessionId(sessionId);
        if (userId == null) {
            throw new UserNotFoundError("Benutzer mit der angegebenen Session-ID nicht gefunden.");
        }
        const isAllowed = await boardMemberModel.isUserAllowedToBoard(userId, boardId);
        if (!isAllowed) {
            throw new PermissionDeniedError("Benutzer hat keine Berechtigung für diesen Board.");
        }
        const result = await listModel.insertList(listName, boardId);
        return {statusCode: 201};
    }

    async updateList(sessionId, listId, listName) {
        const myUserId = await findUserBySessionId(sessionId);
        const result = await listModel.updateList(listId, listName);
        return {statusCode: 200};
    }

    async removeList(sessionId, listId) {
        const myUserId = await findUserBySessionId(sessionId);
        const boardId = await listModel.selectBoardIdFromList(listId);
        const userToAddEntry = await boardMemberModel.getBoardUserEntries(myUserId, boardId);
        if (userToAddEntry[0] === null || userToAddEntry[0] === undefined) {
            throw new PermissionDeniedError("User is not allowed to board");
        } else {
            const result = await listModel.deleteList(listId);
            return {statusCode: 200};
        }
    }
}

export default new ListController();