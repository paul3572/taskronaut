DROP DATABASE IF EXISTS TaskRonaut;
CREATE DATABASE TaskRonaut;
USE TaskRonaut;

-- Users Tabelle
CREATE TABLE Users (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    email           VARCHAR(255) NOT NULL UNIQUE,
    password        VARCHAR(255) NOT NULL,
    firstname       VARCHAR(255) NOT NULL,
    lastname        VARCHAR(255) NOT NULL,
    activationToken VARCHAR(255) DEFAULT NULL,
    activated       BOOLEAN DEFAULT FALSE
);


-- Board Tabelle mit Chat-Verknüpfung
CREATE TABLE Boards (
    boardID   INT AUTO_INCREMENT PRIMARY KEY,
    boardName VARCHAR(255) NOT NULL
);
CREATE TABLE P2PMessages(
    messageID INT AUTO_INCREMENT PRIMARY KEY,
    message   VARCHAR(255) DEFAULT '',
    senderID  INT,
    reciverID INT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (senderID) REFERENCES Users (id),
    FOREIGN KEY (reciverID) REFERENCES Users (id)
);

-- Listen pro Board
CREATE TABLE Lists (
    listID   INT AUTO_INCREMENT PRIMARY KEY,
    listName VARCHAR(255) NOT NULL,
    boardID  INT,
    FOREIGN KEY (boardID) REFERENCES Boards (boardID) ON DELETE CASCADE
);

-- Aufgaben pro Liste
CREATE TABLE Tasks (
    taskID           INT AUTO_INCREMENT PRIMARY KEY,
    taskCreatorID    INT,
    taskCreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dueDate          DATE DEFAULT (CURRENT_DATE),
    taskDescription  VARCHAR(800) DEFAULT '',
    taskName         VARCHAR(255),
    priorities       INT DEFAULT 1,
    taskStatus       VARCHAR(255) DEFAULT 'todo',
    comments         VARCHAR(800) DEFAULT '',
    boardID          INT,
    listID           INT,
    FOREIGN KEY (taskCreatorID) REFERENCES Users (id) ON DELETE SET NULL,
    FOREIGN KEY (boardID) REFERENCES Boards (boardID) ON DELETE CASCADE,
    FOREIGN KEY (listID) REFERENCES Lists (listID) ON DELETE CASCADE
);

-- Nachrichten in Chats
CREATE TABLE BoardMessages (
    messageID INT AUTO_INCREMENT PRIMARY KEY,
    boardID    INT NOT NULL,
    senderID  INT NOT NULL,
    message   TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (boardID) REFERENCES Boards (boardID) ON DELETE CASCADE,
    FOREIGN KEY (senderID) REFERENCES Users (id) ON DELETE CASCADE
);


-- Autorisierte Benutzer für Aufgaben
CREATE TABLE AuthorizedUsers (
    userID        INT,
    taskID        INT,
    isAuthorized  BOOLEAN DEFAULT FALSE,
    isResponsible BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (userID, taskID),
    FOREIGN KEY (userID) REFERENCES Users (id) ON DELETE CASCADE,
    FOREIGN KEY (taskID) REFERENCES Tasks (taskID) ON DELETE CASCADE
);

-- Sitzungen für Login-Management
CREATE TABLE Sessions (
    sessionId VARCHAR(255) PRIMARY KEY,
    userId    INT NOT NULL,
    expires   TIMESTAMP DEFAULT (NOW() + INTERVAL 1 DAY),
    FOREIGN KEY (userId) REFERENCES Users (id) ON DELETE CASCADE
);
