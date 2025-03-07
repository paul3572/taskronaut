USE TaskRonaut;

-- Beispiel-Daten in Tabelle 'Users' einfügen
INSERT INTO Users (email, password, firstname, lastname, activated)
VALUES ('paul@example.at', 'password1', 'Paul', 'Schreiber', true),
       ('dominik@example.at', 'password2', 'Dominik', 'Platzer', true),
       ('lucas@example.at', 'password3', 'Lucas', 'Oberstaller', false);

-- Beispiel-Daten in Tabelle 'Boards' einfügen
INSERT INTO Boards (boardName)
VALUES ('Board1'),
       ('Board2');


-- Beispiel-Daten in Tabelle 'Lists' einfügen
INSERT INTO Lists (listName, boardID, userID)
VALUES ('List1', 1, 1),
       ('List2', 2, 3);


-- Beispiel-Daten in Tabelle 'Tasks' einfügen
INSERT INTO Tasks (taskCreatorID, taskCreationDate, dueDate, taskDescription, taskName,
                   priorities, taskStatus, comments, taskHistoryID, boardID, listID)
VALUES (1, '2024-07-01', '2024-07-10', 'Erste Aufgabe von Paul', 'Task 1', 3, 'todo',
        'Kein Kommentar', 1, 1, 1),
       (2, '2024-07-02', '2024-07-15', 'Erste Aufgabe von Dominik', 'Task 2', 1, 'done',
        'Kein Kommentar', 2, 2, 1),
       (3, '2024-07-03', '2024-07-20', 'Erste Aufgabe von Lucas', 'Task 3', 5, 'doing',
        'Kein Kommentar', 2, 1, 2);


-- Beispiel-Daten in Tabelle 'Messages' einfügen
INSERT INTO Messages (sender_id, receiver_id, message)
VALUES (1, 2, 'hello world'),
       (2, 1, 'antwort'),
       (1, 2, 'noch eine antwort');


-- Beispiel-Daten in Tabelle 'Roles' einfügen
INSERT INTO Roles (roleName, reading, writing)
VALUES ('Owner', 1, 1),
       ('Guest', 1, 0);


-- Beispiel-Daten in Zwischentabelle 'BoardMembers einfügen
INSERT INTO BoardMembers (roleID, userID, boardID)
VALUES (1, 1, 1),
       (2, 2, 2);
