export const authenticationQueries = {
    getUserByEmail: 'SELECT * FROM Users WHERE email = ?',
    insertUser: 'INSERT INTO Users (email, password, firstName, lastName) VALUES (?, ?, ?, ?)',
    getUserActivationStatus: 'SELECT activated FROM Users WHERE id = ?',
    updateUserActivationStatus: 'UPDATE Users SET activated = ? WHERE id = ?',
    getUserByActivationToken: 'SELECT id FROM Users WHERE activationtoken = ?',
    getUserIdByEmail: 'SELECT id FROM Users WHERE email = ?',
    setEmailActivationStatus: 'UPDATE Users SET activationToken = ? WHERE id = ?',
    getActivationTokenFromUser: 'SELECT activationToken FROM Users WHERE email = ?',
    getUserById: 'SELECT firstname, lastname, email FROM Users WHERE id = ?',
    getSessionByUserId: 'SELECT sessionId FROM Sessions WHERE userId     = ?',
    getSessionBySessionId: 'SELECT * FROM Sessions WHERE sessionId = ?',
    getUserIdBySessionId: 'SELECT userId FROM Sessions WHERE sessionId = ?',
    userIdEmailActivated: 'SELECT activated FROM Users WHERE id = ?',
};
export const boardQueries = {
    getAllUserBoards: 'SELECT * FROM Boards WHERE boardID = ?',
    insertBoard: 'INSERT INTO Boards (boardName) VALUES (?)',
    updateBoard: 'UPDATE Boards SET boardName = ? WHERE boardID = ?',
    deleteBoardById: 'DELETE FROM Boards WHERE boardID = ?',
    getBoardById: 'SELECT * FROM Boards WHERE boardID = ?',
};
export const chatQueries = {
    insertChat: 'INSERT INTO Chats (boardName) VALUES (?)',
    updateBoard: 'UPDATE Boards SET boardName = ? WHERE boardID = ?',
    deleteBoardById: 'DELETE FROM Boards WHERE boardID = ?',
    getBoardById: 'SELECT * FROM Boards WHERE boardID = ?',
};
export const boardMemberQueries = {
    getAllBoardMembers: 'SELECT * FROM BoardMembers WHERE boardId = ?',
    getBoardMemberByUserId: 'SELECT * FROM BoardMembers WHERE userID = ?',
    insertBoardMember: 'INSERT INTO BoardMembers (userID, boardID) VALUES (?, ?)',
    deleteBoardMemberById: 'DELETE FROM BoardMembers WHERE userID = ? AND boardID = ?',
    deleteBoardMemberByBoardId: 'DELETE FROM BoardMembers WHERE boardID = ?',
    selectBoardUserEntries: 'SELECT * FROM BoardMembers WHERE userID = ? AND boardID = ?',
};
export const listQueries = {
    getBoardIdFromList: 'SELECT boardID FROM Lists WHERE listID = ?',
    getLists: 'SELECT * FROM Lists',
    createList: 'INSERT INTO Lists (listName, boardID) VALUES (?, ?)',
    updateList: 'UPDATE Lists SET listName = ? WHERE listID = ?',
    deleteListById: 'DELETE FROM Lists WHERE listID = ?',
    deleteListByBoardId: 'DELETE FROM Lists WHERE boardID = ?',
    readListsFromBoard: 'SELECT * FROM Lists WHERE boardID = ?',
};
export const taskQueries = {
    updateTask: 'UPDATE Tasks SET taskName = ?, dueDate = ?, taskDescription = ?, priorities = ?, taskStatus = ?, comments = ?, boardID = ?, listID = ? WHERE taskID = ?',
    authorizeUser: 'INSERT INTO AuthorizedUsers (userID, taskID, isAuthorized, isResponsible) VALUES (?, ?, ?, ?)',
    getTaskId: 'SELECT taskID FROM Tasks WHERE taskCreatorID = ? AND taskName = ? AND boardID = ? AND listID = ?',
    getAllTasks: 'SELECT * FROM Tasks',
    getTaskById: 'SELECT * FROM Tasks WHERE taskID = ?',
    deleteTaskById: 'DELETE FROM Tasks WHERE taskID = ?',
    updateTaskListId: 'UPDATE Tasks SET listID = ? WHERE taskID = ?',
    getListIdFromTaskById: 'SELECT listID FROM Tasks WHERE taskID = ?',
    getBoardIdFromTaskById: 'SELECT boardID FROM Tasks WHERE taskID = ?',
    deleteTasksByListId: 'DELETE FROM Tasks WHERE listID = ?',
    deleteTasksByBoardId: 'DELETE FROM Tasks WHERE boardID = ?',
    deleteTaskbyBoardList: 'DELETE FROM Tasks WHERE listID IN (SELECT listID FROM Lists WHERE boardID = ?)',
    getTasksByUserId: 'SELECT  taskID, isResponsible FROM AuthorizedUsers WHERE isAuthorized = 1 AND userID = ?',
    addDeafaultTask: 'INSERT INTO Tasks (taskCreatorID, taskName, boardID, listID) VALUES (?, ?, ?, ?)',
};
export const dragANDdropQueries = {
    updateListId: 'UPDATE Tasks SET listID = ? WHERE taskID = ?',
    updateTaskStatus: 'UPDATE Tasks SET taskStatus = ? WHERE taskID = ?',
}
export const boardMessageQueries = {
    createMessage: 'INSERT INTO BoardMessages (boardID, senderID, message) VALUES (?, ?, ?)',
    deleteMessage: 'DELETE FROM BoardMessages WHERE messageID = ?',
    updateMessage: 'UPDATE BoardMessages SET message = ? WHERE messageID = ?',
    getMessageById: 'SELECT * FROM BoardMessages WHERE messageID = ?',
    getMessagesByUserId: 'SELECT * FROM BoardMessages WHERE userID = ?',
    getMessagesByBoardId: 'SELECT * FROM BoardMessages WHERE boardID = ?',
    getBoardIdByMessageId: 'SELECT boardID FROM BoardMessages WHERE messageID = ?',

};
export const p2pMessageQueries = {
    isUserAuthor: 'SELECT * FROM P2PMessages WHERE senderID = ? AND messageID = ?',
    createMessage: 'INSERT INTO P2PMessages (senderID, reciverID, message) VALUES (?, ?, ?)',
    deleteMessage: 'DELETE FROM P2PMessages WHERE messageID = ?',
    updateMessage: 'UPDATE P2PMessages SET message = ? WHERE messageID = ?',
    getMessageById: 'SELECT * FROM P2PMessages WHERE messageID = ?',
    getMessagesByReceiverId: 'SELECT * FROM P2PMessages WHERE reciverID = ?',
    getMessagesByUsers: 'SELECT * FROM P2PMessages WHERE senderID = ? AND reciverID = ?',
}
export const sessionQueries = {
    updateSessionUserId: 'UPDATE Sessions SET userId = ? WHERE sessionId = ?',
    getUserIdBySessionId: 'SELECT userId FROM Sessions WHERE sessionId = ?',
    getSessionIds: 'SELECT sessionId FROM Sessions',
};
export const joins = {
    getBoardTasks: 'SELECT * FROM Tasks  WHERE boardID = ?',
};
