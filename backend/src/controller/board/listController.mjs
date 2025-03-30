import listModel from "../../models/board/listModel.mjs";
import authenticationModel from "../../models/authentication/authenticationModel.mjs";
import boardMemberModel from "../../models/board/boardMemberModel.mjs";
import {PermissionDeniedError, UserNotFoundError} from "../../config/errors.mjs";
import {findUserBySessionId} from "../../middleware/session.mjs";

class ListController {
    async handleListRequest() {
        const result = await listModel.getAllLists();
        return {statusCode: 200, data: result[0]};
    }


    async handleListRequestForBoard(sessionId, boardId) {
        const userId = await authenticationModel.getUserIdBySessionId(sessionId);
        if (userId === null || undefined) {
            throw new UserNotFoundError("Benutzer mit der angegebenen Session-ID nicht gefunden.");
        }
        const isAllowed = await boardMemberModel.getUserAllowedToBoardStatus(userId, boardId);
        if (!isAllowed) {
            throw new PermissionDeniedError("Benutzer hat keine Berechtigung für diesen Board.");
        }
        const result = await listModel.getListsFromBoard(boardId);
        return {statusCode: 200, data: result};
    }

    async handleListCreation(sessionId, boardId, listName) {
        const userId = await authenticationModel.getUserIdBySessionId(sessionId);
        if (userId == null) {
            throw new UserNotFoundError("Benutzer mit der angegebenen Session-ID nicht gefunden.");
        }
        const isAllowed = await boardMemberModel.getUserAllowedToBoardStatus(userId, boardId);
        if (!isAllowed) {
            throw new PermissionDeniedError("Benutzer hat keine Berechtigung für diesen Board.");
        }
        const result = await listModel.createList(listName, boardId);
        return {statusCode: 201};
    }

    async handleListUpdateRequest(sessionId, listId, listName) {
        const myUserId = await findUserBySessionId(sessionId);
        const result = await listModel.updateList(listId, listName);
        return {statusCode: 200};
    }

    async handleListRemovalRequest(sessionId, listId) {
        const myUserId = await findUserBySessionId(sessionId);
        const boardId = await listModel.getBoardIdFromList(listId);
        const userToAddEntry = await boardMemberModel.getUserEntriesInBoard(myUserId, boardId);
        if (userToAddEntry[0] === null || userToAddEntry[0] === undefined) {
            throw new PermissionDeniedError("User is not allowed to board");
        } else {
            const result = await listModel.deleteList(listId);
            return {statusCode: 200};
        }
    }
}

export default new ListController();