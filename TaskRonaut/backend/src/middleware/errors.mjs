export class DatabaseConnectionError extends Error {
    constructor(message) {
        super(message);
        this.name = "DatabaseConnectionError";
    }
}

export class UserNotFoundError extends Error {
    constructor(userId) {
        super(`Benutzer mit der ID ${userId} wurde nicht gefunden.`);
        this.name = "UserNotFoundError";
        this.userId = userId;
    }
}

export class NoBoardsFoundError extends Error {
    constructor(userId) {
        super(`Keine Boards für den Benutzer mit der ID ${userId} gefunden.`);
        this.name = "NoBoardsFoundError";
        this.userId = userId;
    }
}

export class InvalidBoardMemberDataError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidBoardMemberDataError";
    }
}

export class BoardNotFoundError extends Error {
    constructor(boardId) {
        super(`Board mit der ID ${boardId} wurde nicht gefunden.`);
        this.name = "BoardNotFoundError";
        this.boardId = boardId;
    }
}

export class QueryExecutionError extends Error {
    constructor(query, params, originalError) {
        super(`Fehler bei der Ausführung der Abfrage: ${query}. Parameter: ${JSON.stringify(params)}. Ursprünglicher Fehler: ${originalError.message}`);
        this.name = "QueryExecutionError";
        this.query = query;
        this.params = params;
        this.originalError = originalError;
    }
}

export class ActivationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ActivationError";
    }
}

export class DatabaseError extends Error {
    constructor(message) {
        super(message);
        this.name = "DatabaseError";
    }
}

export class PermissionDeniedError extends Error {
    constructor(message) {
        super(message);
        this.name = "PermissionDeniedError";
    }
}

export class InvalidTokenError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidTokenError";
    }
}

export class InvalidSessionError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidSessionError";
    }
}

export class InvalidInputError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidInputError";
    }
}
export class UserIsAlreadyMemberError extends Error {
    constructor(message) {
        super(message);
        this.name = "UserIsAlreadyMemberError";
    }
}

export class UserNotActivatedError extends Error {
    constructor(message) {
        super(message);
        this.name = "UserNotActivatedError";
    }
}

export class InvalidLoginDataError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidLoginDataError";
    }
}

export class EmailAlreadyInUseError extends Error {
    constructor(message) {
        super(message);
        this.name = "EmailAlreadyInUseError";
    }
}

export class ActivationTokenNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "ActivationTokenNotFoundError";
    }
}


