export const authenticationQueries = {
    selectUserByEmail: 'SELECT * FROM Users WHERE email = ?',
    insertUser: 'INSERT INTO Users (email, password, firstName, lastName) VALUES (?, ?, ?, ?)',
    selectUserActivationStatus: 'SELECT activated FROM Users WHERE id = ?',
    updateUserActivationStatus: 'UPDATE Users SET activated = ? WHERE id = ?',
    selectUserByActivationToken: 'SELECT id FROM Users WHERE activationtoken = ?',
    selectUserIdByEmail: 'SELECT id FROM Users WHERE email = ?',
    updateEmailActivationStatus: 'UPDATE Users SET activationToken = ? WHERE id = ?',
    selectActivationTokenFromUser: 'SELECT activationToken FROM Users WHERE email = ?',
    selectUserById: 'SELECT firstname, lastname, email FROM Users WHERE id = ?',
    selectSessionByUserId: 'SELECT sessionId FROM Sessions WHERE userId     = ?',
    selectSessionBySessionId: 'SELECT * FROM Sessions WHERE sessionId = ?',
    selectUserIdBySessionId: 'SELECT userId FROM Sessions WHERE sessionId = ?',
    selectActivatedFromUser: 'SELECT activated FROM Users WHERE id = ?',
};
export const boardQueries = {
    selectAllUserBoards: 'SELECT * FROM Boards WHERE boardID = ?',
    insertBoard: 'INSERT INTO Boards (boardName) VALUES (?)',
    updateBoard: 'UPDATE Boards SET boardName = ? WHERE boardID = ?',
    deleteBoardById: 'DELETE FROM Boards WHERE boardID = ?',
    selectBoardById: 'SELECT * FROM Boards WHERE boardID = ?',
};
export const chatQueries = {
    insertChat: 'INSERT INTO Chats (boardName) VALUES (?)',
    updateBoard: 'UPDATE Boards SET boardName = ? WHERE boardID = ?',
    deleteBoardById: 'DELETE FROM Boards WHERE boardID = ?',
    selectBoardById: 'SELECT * FROM Boards WHERE boardID = ?',
};
export const boardMemberQueries = {
    selectAllBoardMembers: 'SELECT * FROM BoardMembers WHERE boardId = ?',
    selectBoardMemberByUserId: 'SELECT * FROM BoardMembers WHERE userID = ?',
    insertBoardMember: 'INSERT INTO BoardMembers (userID, boardID) VALUES (?, ?)',
    deleteBoardMemberById: 'DELETE FROM BoardMembers WHERE userID = ? AND boardID = ?',
    deleteBoardMemberByBoardId: 'DELETE FROM BoardMembers WHERE boardID = ?',
    selectBoardUserEntries: 'SELECT * FROM BoardMembers WHERE userID = ? AND boardID = ?',
};
export const listQueries = {
    selectBoardIdFromList: 'SELECT boardID FROM Lists WHERE listID = ?',
    selectLists: 'SELECT * FROM Lists',
    createList: 'INSERT INTO Lists (listName, boardID) VALUES (?, ?)',
    updateList: 'UPDATE Lists SET listName = ? WHERE listID = ?',
    deleteListById: 'DELETE FROM Lists WHERE listID = ?',
    deleteListByBoardId: 'DELETE FROM Lists WHERE boardID = ?',
    selectListsFromBoard: 'SELECT * FROM Lists WHERE boardID = ?',
};
export const taskQueries = {
    updateTask: 'UPDATE Tasks SET taskName = ?, dueDate = ?, taskDescription = ?, priorities = ?, taskStatus = ?, comments = ?, boardID = ?, listID = ? WHERE taskID = ?',
    insertAuthorizedUser: 'INSERT INTO AuthorizedUsers (userID, taskID, isAuthorized, isResponsible) VALUES (?, ?, ?, ?)',
    selectTaskId: 'SELECT taskID FROM Tasks WHERE taskCreatorID = ? AND taskName = ? AND boardID = ? AND listID = ?',
    selectAllTasks: 'SELECT * FROM Tasks',
    selectTaskById: 'SELECT * FROM Tasks WHERE taskID = ?',
    deleteTaskById: 'DELETE FROM Tasks WHERE taskID = ?',
    updateTaskListId: 'UPDATE Tasks SET listID = ? WHERE taskID = ?',
    selectListIdFromTaskById: 'SELECT listID FROM Tasks WHERE taskID = ?',
    selectBoardIdFromTaskById: 'SELECT boardID FROM Tasks WHERE taskID = ?',
    deleteTasksByListId: 'DELETE FROM Tasks WHERE listID = ?',
    deleteTasksByBoardId: 'DELETE FROM Tasks WHERE boardID = ?',
    deleteTaskByBoardList: 'DELETE FROM Tasks WHERE listID IN (SELECT listID FROM Lists WHERE boardID = ?)',
    selectTasksByUserId: 'SELECT  taskID, isResponsible FROM AuthorizedUsers WHERE isAuthorized = 1 AND userID = ?',
    insertDefaultTask: 'INSERT INTO Tasks (taskCreatorID, taskName, boardID, listID) VALUES (?, ?, ?, ?)',
};
export const dragANDdropQueries = {
    updateListId: 'UPDATE Tasks SET listID = ? WHERE taskID = ?',
    updateTaskStatus: 'UPDATE Tasks SET taskStatus = ? WHERE taskID = ?',
}
export const boardMessageQueries = {
    insertMessage: 'INSERT INTO BoardMessages (boardID, senderID, message) VALUES (?, ?, ?)',
    deleteMessage: 'DELETE FROM BoardMessages WHERE messageID = ?',
    updateMessage: 'UPDATE BoardMessages SET message = ? WHERE messageID = ?',
    selectMessageById: 'SELECT * FROM BoardMessages WHERE messageID = ?',
    selectMessagesByUserId: 'SELECT * FROM BoardMessages WHERE userID = ?',
    selectMessagesByBoardId: 'SELECT * FROM BoardMessages WHERE boardID = ?',
    selectBoardIdByMessageId: 'SELECT boardID FROM BoardMessages WHERE messageID = ?',

};
export const p2pMessageQueries = {
    selectAuthorisationStatus: 'SELECT * FROM P2PMessages WHERE senderID = ? AND messageID = ?',
    insertMessage: 'INSERT INTO P2PMessages (senderID, reciverID, message) VALUES (?, ?, ?)',
    deleteMessage: 'DELETE FROM P2PMessages WHERE messageID = ?',
    updateMessage: 'UPDATE P2PMessages SET message = ? WHERE messageID = ?',
    selectMessageById: 'SELECT * FROM P2PMessages WHERE messageID = ?',
    selectMessagesByReceiverId: 'SELECT * FROM P2PMessages WHERE reciverID = ?',
    selectMessagesByUsers: 'SELECT * FROM P2PMessages WHERE senderID = ? AND reciverID = ?',
}
export const sessionQueries = {
    updateSessionUserId: 'UPDATE Sessions SET userId = ? WHERE sessionId = ?',
    selectUserIdBySessionId: 'SELECT userId FROM Sessions WHERE sessionId = ?',
    selectSessionIds: 'SELECT sessionId FROM Sessions',
};
export const joins = {
    selectBoardTasks: 'SELECT * FROM Tasks  WHERE boardID = ?',
};
