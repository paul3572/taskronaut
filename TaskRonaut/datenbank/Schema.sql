DROP DATABASE IF EXISTS TaskRonaut;
CREATE DATABASE TaskRonaut;USE TaskRonaut;

-- Tabelle 'Users' erstellen
DROP TABLE IF EXISTS Users;
CREATE TABLE Users
(
    id              INT AUTO_INCREMENT PRIMARY KEY,
    email           VARCHAR(255) NOT NULL,
    password        VARCHAR(255) NOT NULL,
    firstname       VARCHAR(255) NOT NULL,
    lastname        VARCHAR(255) NOT NULL,
    activationToken VARCHAR(255) default null,
    activated       boolean      default false,
    UNIQUE (email)
);

-- Tabelle 'Board' erstellen
DROP TABLE IF EXISTS Boards;
CREATE TABLE Boards
(
    boardID   INT AUTO_INCREMENT PRIMARY KEY,
    boardName VARCHAR(255) NOT NULL
);

-- Tabelle 'Lists' erstellen
DROP TABLE IF EXISTS Lists;
CREATE TABLE Lists
(
    listID   INT AUTO_INCREMENT PRIMARY KEY,
    listName VARCHAR(255) NOT NULL,
    boardID  INT,
    FOREIGN KEY (boardID) REFERENCES Boards (boardID)
);


-- Tabelle 'Task' erstellen
DROP TABLE IF EXISTS Tasks;
CREATE TABLE Tasks
(
    taskID           INT AUTO_INCREMENT PRIMARY KEY,
    taskCreatorID    INT,
    taskCreationDate DATE DEFAULT CURRENT_TIMESTAMP,
    dueDate          DATE DEFAULT CURRENT_TIMESTAMP,
    taskDescription  VARCHAR(255),
    taskName         VARCHAR(255),
    priorities       INT,
    taskStatus       VARCHAR(255) DEFAULT "todo",
    comments         VARCHAR(255),
    taskHistoryID    INT,
    boardID          INT,
    listID           INT,
    FOREIGN KEY (taskCreatorID) REFERENCES Users (id),
    FOREIGN KEY (boardID) REFERENCES Boards (boardID),
    FOREIGN KEY (listID) REFERENCES Lists (listID) ON DELETE CASCADE
);

-- Tabelle 'Messages' erstellen
DROP TABLE IF EXISTS Messages;
CREATE TABLE Messages
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    sender_id   INT  NOT NULL,
    receiver_id INT  NOT NULL,
    message     TEXT NOT NULL,
    timestamp   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES Users (id),
    FOREIGN KEY (receiver_id) REFERENCES Users (id)
);

-- Tabelle 'Groups' erstellen
DROP TABLE IF EXISTS Groups;
CREATE TABLE Groups
(
    groupID   INT AUTO_INCREMENT PRIMARY KEY,
    memberID  INT,
    groupName VARCHAR(255),
    FOREIGN KEY (memberID) REFERENCES Users (id)
);

-- Tabelle 'Roles' erstellen
DROP TABLE IF EXISTS Roles;
CREATE TABLE Roles
(
    roleID   int AUTO_INCREMENT PRIMARY KEY,
    roleName varchar(255),
    reading  int,
    writing  int,
    execute  int,
    deleting int,
    creating int
);

-- Zwischentabelle 'BoardMembers' erstellen
DROP TABLE IF EXISTS BoardMembers;
CREATE TABLE BoardMembers
(
    roleID  int,
    userID  int,
    boardID int,
    FOREIGN KEY (roleID) REFERENCES Roles (roleID),
    FOREIGN KEY (userID) REFERENCES Users (id),
    FOREIGN KEY (boardID) REFERENCES Boards (boardID) ON DELETE CASCADE
);

-- Zwischentabelle 'AuthorizedUsers' erstellen
DROP TABLE IF EXISTS AuthorizedUsers;
CREATE TABLE AuthorizedUsers
(
    userID        int,
    taskID        int,
    isAuthorized  BOOLEAN default false,
    isResponsible BOOLEAN default false,
    FOREIGN KEY (userID) REFERENCES Users (id),
    FOREIGN KEY (taskID) REFERENCES Tasks (taskID) ON DELETE CASCADE
);


-- Tabelle 'Sessions' erstellen
DROP TABLE IF EXISTS Sessions;
CREATE TABLE Sessions
(
    session_id varchar(128) NOT NULL,
    expires    int(11) unsigned NOT NULL,
    data       text,
    user_id    int(11),
    PRIMARY KEY (`session_id`),
    FOREIGN KEY (user_id) REFERENCES Users (id),
    KEY        expires (`expires`)
);
