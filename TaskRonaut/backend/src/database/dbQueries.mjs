export const authenticationQueries = {
    getUserByEmail: 'SELECT * FROM users WHERE email = ?',
    insertUser: 'INSERT INTO users (email, password, firstName, lastName) VALUES (?, ?, ?, ?)',
    getUserActivationStatus: 'SELECT activated FROM Users WHERE id = ?',
    updateUserActivationStatus: 'UPDATE Users SET activated = ? WHERE id = ?',
    getUserByActivationToken: 'SELECT id FROM Users WHERE activationtoken = ?',
    getUserIdByEmail: 'SELECT id FROM Users WHERE email = ?',
    setEmailActivationStatus: 'UPDATE Users SET activationToken = ? WHERE id = ?',
    getActivationTokenFromUser: 'SELECT activationToken FROM Users WHERE email = ?',
    getUserById: 'SELECT firstname, lastname, email FROM Users WHERE id = ?',
    getSessionByUserId: 'SELECT session_id FROM Sessions WHERE user_id = ?',
    getSessionBySessionId: 'SELECT * FROM Sessions WHERE session_id = ?',
    getUserIdBySessionId: 'SELECT user_id FROM Sessions WHERE session_id = ?',
    userIdEmailActivated: 'SELECT activated FROM Users WHERE id = ?',
};
export const boardQueries = {
    getAllUserBoards: 'SELECT * FROM Boards WHERE boardID = ?',
    insertBoard: 'INSERT INTO Boards (boardName) VALUES (?)',
    deleteBoardById: 'DELETE FROM Boards WHERE boardID = ?',
    getBoardById: 'SELECT * FROM Boards WHERE boardID = ?',
};
export const boardMemberQueries = {
    getAllBoardMembers: 'SELECT * FROM BoardMembers WHERE boardId = ?',
    getBoardMemberByUserId: 'SELECT * FROM BoardMembers WHERE userID = ?',
    insertBoardMember: 'INSERT INTO BoardMembers (userID, boardID) VALUES (?, ?)',
    deleteBoardMemberById: 'DELETE FROM BoardMembers WHERE userID = ?',
    deleteBoardMemberByBoardId: 'DELETE FROM BoardMembers WHERE boardID = ?',
};
export const listQueries = {
    getLists: 'SELECT * FROM Lists',
    createList: 'INSERT INTO lists (listName, boardID) VALUES (?, ?)',
    updateList: 'UPDATE lists SET listName = ? WHERE listID = ?',
    deleteListById: 'DELETE FROM lists WHERE listID = ?',
    deleteListByBoardId: 'DELETE FROM lists WHERE boardID = ?',
    readListsFromBoard: 'SELECT * FROM Lists WHERE boardID = ?',
};
export const taskQueries = {
    updateTask: 'UPDATE Tasks SET taskName = ?, taskCreatorID = ?, taskCreationDate = ?, dueDate = ?, responsibleID = ?, taskDescription = ?, priorities = ?, category = ?, taskStatus = ?, authorizedUsers = ?, comments = ?, taskHistoryID = ?, boardID = ?, listID = ? WHERE taskID = ?',
    authorizeUser: 'INSERT INTO AuthorizedUsers (userID, taskID, isAuthorized, isResponsible) VALUES (?, ?, ?, ?)',
    getTaskId: 'SELECT taskID FROM Tasks WHERE taskCreatorID = ? AND taskName = ? AND boardID = ? AND listID = ?',
    getAllTasks: 'SELECT * FROM Tasks',
    getTaskById: 'SELECT * FROM Tasks WHERE taskID = ?',
    deleteTaskById: 'DELETE FROM Tasks WHERE taskID = ?',
    updateTaskListId: 'UPDATE Tasks SET listID = ? WHERE taskID = ?',
    getListIdFromTaskById: 'SELECT listID FROM Tasks WHERE taskID = ?',
    deleteTasksByListId: 'DELETE FROM tasks WHERE listID = ?',
    deleteTasksByBoardId: 'DELETE FROM tasks WHERE boardID = ?',
    deleteTaskbyBoardList: 'DELETE FROM Tasks WHERE listID IN (SELECT listID FROM Lists WHERE boardID = ?)',
    getTasksByUserId: 'SELECT  taskID, isResponsible FROM AuthorizedUsers WHERE isAuthorized = 1 AND userID = ?',
    addDeafaultTask: 'INSERT INTO Tasks (taskCreatorID, taskName, boardID, listID) VALUES (?, ?, ?, ?)',
};
export const messageQueries = {
    getAllMessages: 'SELECT * FROM Messages',
    addMessage: 'INSERT INTO Messages (`from`, `to`, content) VALUES (?, ?, ?)',
    getMessageById: 'SELECT * FROM Messages WHERE id = ?'
};
export const sessionQueries = {
    updateSessionUserId: 'UPDATE sessions SET user_id = ? WHERE session_id = ?',
    getUserIdBySessionId: 'SELECT user_id FROM sessions WHERE session_id = ?',
    getSessionIds: 'SELECT session_id FROM sessions',
};
