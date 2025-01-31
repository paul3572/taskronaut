Drop database taskronaut if exists;
Use taskronaut;

--
-- Datenbank: `taskronaut`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `authorizedusers`
--

CREATE TABLE `authorizedusers` (
                                   `userID` int(11) DEFAULT NULL,
                                   `taskID` int(11) DEFAULT NULL,
                                   `isAuthorized` tinyint(1) DEFAULT 0,
                                   `isResponsible` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `authorizedusers`
--

INSERT INTO `authorizedusers` (`userID`, `taskID`, `isAuthorized`, `isResponsible`) VALUES
                                                                                        (4, 4, 1, 0),
                                                                                        (4, 5, 1, 0),
                                                                                        (4, 6, 1, 0),
                                                                                        (4, 7, 1, 0),
                                                                                        (4, 8, 1, 0),
                                                                                        (4, 9, 1, 0),
                                                                                        (5, 4, 1, 1),
                                                                                        (5, 5, 1, 1),
                                                                                        (5, 10, 1, 0),
                                                                                        (5, 11, 1, 0),
                                                                                        (5, 12, 1, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `boardmembers`
--

CREATE TABLE `boardmembers` (
                                `roleID` int(11) DEFAULT NULL,
                                `userID` int(11) DEFAULT NULL,
                                `boardID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `boardmembers`
--

INSERT INTO `boardmembers` (`roleID`, `userID`, `boardID`) VALUES
                                                               (1, 1, 1),
                                                               (2, 2, 2),
                                                               (1, 4, 1),
                                                               (1, 5, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `boards`
--

CREATE TABLE `boards` (
                          `boardID` int(11) NOT NULL,
                          `boardName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `boards`
--

INSERT INTO `boards` (`boardID`, `boardName`) VALUES
                                                  (1, 'Board1'),
                                                  (2, 'Board2');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `groups`
--

CREATE TABLE `groups` (
                          `groupID` int(11) NOT NULL,
                          `memberID` int(11) DEFAULT NULL,
                          `groupName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `groups`
--

INSERT INTO `groups` (`groupID`, `memberID`, `groupName`) VALUES
                                                              (1, 1, 'Group1'),
                                                              (2, 2, 'Group2');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `lists`
--

CREATE TABLE `lists` (
                         `listID` int(11) NOT NULL,
                         `listName` varchar(255) NOT NULL,
                         `boardID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `lists`
--

INSERT INTO `lists` (`listID`, `listName`, `boardID`) VALUES
                                                          (2, 'List2', 2),
                                                          (3, 'Frontend', 1),
                                                          (4, 'Backend', 1),
                                                          (5, 'Design', 1),
                                                          (6, 'Andere Ideen', 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `messages`
--

CREATE TABLE `messages` (
                            `id` int(11) NOT NULL,
                            `sender_id` int(11) NOT NULL,
                            `receiver_id` int(11) NOT NULL,
                            `message` text NOT NULL,
                            `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `messages`
--

INSERT INTO `messages` (`id`, `sender_id`, `receiver_id`, `message`, `timestamp`) VALUES
                                                                                      (1, 1, 2, 'hello world', '2025-01-28 00:28:10'),
                                                                                      (2, 2, 1, 'antwort', '2025-01-28 00:28:10'),
                                                                                      (3, 1, 2, 'noch eine antwort', '2025-01-28 00:28:10');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `roles`
--

CREATE TABLE `roles` (
                         `roleID` int(11) NOT NULL,
                         `roleName` varchar(255) DEFAULT NULL,
                         `reading` int(11) DEFAULT NULL,
                         `writing` int(11) DEFAULT NULL,
                         `execute` int(11) DEFAULT NULL,
                         `deleting` int(11) DEFAULT NULL,
                         `creating` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `roles`
--

INSERT INTO `roles` (`roleID`, `roleName`, `reading`, `writing`, `execute`, `deleting`, `creating`) VALUES
                                                                                                        (1, 'Owner', 1, 1, 1, 1, 1),
                                                                                                        (2, 'Guest', 1, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `sessions`
--

CREATE TABLE `sessions` (
                            `session_id` varchar(128) NOT NULL,
                            `expires` int(11) UNSIGNED NOT NULL,
                            `data` text DEFAULT NULL,
                            `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`, `user_id`) VALUES
                                                                        ('83lSnPElWg-b77ymI_juxh2xClOpUiBp', 1738110987, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-01-29T00:36:26.723Z\",\"httpOnly\":true,\"path\":\"/\"},\"userId\":5}', 5),
                                                                        ('omPw8P5I3EZCn0Dq4iarIhGW5-5K9ZNa', 1738110587, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-01-29T00:29:47.230Z\",\"httpOnly\":true,\"path\":\"/\"},\"userId\":4}', 4);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `tasks`
--

CREATE TABLE `tasks` (
                         `taskID` int(11) NOT NULL,
                         `taskCreatorID` int(11) DEFAULT NULL,
                         `taskCreationDate` date DEFAULT current_timestamp(),
                         `dueDate` date DEFAULT current_timestamp(),
                         `taskDescription` varchar(255) DEFAULT NULL,
                         `taskName` varchar(255) DEFAULT NULL,
                         `priorities` int(11) DEFAULT NULL,
                         `taskStatus` varchar(255) DEFAULT 'todo',
                         `comments` varchar(255) DEFAULT NULL,
                         `taskHistoryID` int(11) DEFAULT NULL,
                         `boardID` int(11) DEFAULT NULL,
                         `listID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `tasks`
--

INSERT INTO `tasks` (`taskID`, `taskCreatorID`, `taskCreationDate`, `dueDate`, `taskDescription`, `taskName`, `priorities`, `taskStatus`, `comments`, `taskHistoryID`, `boardID`, `listID`) VALUES
                                                                                                                                                                                                (4, 4, '2024-12-23', '2025-01-01', NULL, 'Index Seite erstellen', NULL, 'done', NULL, NULL, 1, 3),
                                                                                                                                                                                                (5, 4, '2025-01-28', '2025-04-28', NULL, 'API Einlesen', NULL, 'todo', NULL, NULL, 1, 4),
                                                                                                                                                                                                (6, 4, '2025-01-05', '2025-01-28', NULL, 'Skizzen zeichnen', NULL, 'done', NULL, NULL, 1, 5),
                                                                                                                                                                                                (7, 4, '2025-01-02', '2025-02-12', NULL, 'Login Seite erstellen', NULL, 'validated', NULL, NULL, 1, 3),
                                                                                                                                                                                                (8, 4, '2025-01-28', '2025-02-13', NULL, 'Server Programmieren', NULL, 'doing', NULL, NULL, 1, 4),
                                                                                                                                                                                                (9, 4, '2025-01-28', '2025-01-28', NULL, 'Ski Fahren', NULL, 'todo', NULL, NULL, 1, 6),
                                                                                                                                                                                                (10, 5, '2025-01-28', '2025-01-28', NULL, 'Auto Fahren', NULL, 'validated', NULL, NULL, 1, 6),
                                                                                                                                                                                                (11, 5, '2025-01-28', '2025-01-28', NULL, 'Server Hoster Finden', NULL, 'todo', NULL, NULL, 1, 4),
                                                                                                                                                                                                (12, 5, '2025-01-28', '2025-01-28', NULL, 'Zkizzieren', NULL, 'doing', NULL, NULL, 1, 5);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE `users` (
                         `id` int(11) NOT NULL,
                         `email` varchar(255) NOT NULL,
                         `password` varchar(255) NOT NULL,
                         `firstname` varchar(255) NOT NULL,
                         `lastname` varchar(255) NOT NULL,
                         `activationToken` varchar(255) DEFAULT NULL,
                         `activated` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `firstname`, `lastname`, `activationToken`, `activated`) VALUES
                                                                                                             (1, 'paul@example.at', 'password1', 'Paul', 'Schreiber', NULL, 1),
                                                                                                             (2, 'dominik@example.at', 'password2', 'Dominik', 'Platzer', NULL, 1),
                                                                                                             (3, 'lucas@example.at', 'password3', 'Lucas', 'Oberstaller', NULL, 0),
                                                                                                             (4, 'lucasobst29@gmail.com', '94ecb7fa74a09c1ebc38319f0a93e55ee3dbee6b66269edbec9eec03a0cb29ae', 'Lucas', 'Oberstaller', '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a', 1),
                                                                                                             (5, 'paul.schreiber+60@it.htl-hl.ac.at', 'd2cc2514117ea5fd41c239a2a850c73165fb2ee17dabebf62e6b8a8d05e531e4', 'paul', 'schreiber', 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d', 1);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `authorizedusers`
--
ALTER TABLE `authorizedusers`
    ADD KEY `userID` (`userID`),
  ADD KEY `taskID` (`taskID`);

--
-- Indizes für die Tabelle `boardmembers`
--
ALTER TABLE `boardmembers`
    ADD KEY `roleID` (`roleID`),
  ADD KEY `userID` (`userID`),
  ADD KEY `boardID` (`boardID`);

--
-- Indizes für die Tabelle `boards`
--
ALTER TABLE `boards`
    ADD PRIMARY KEY (`boardID`);

--
-- Indizes für die Tabelle `groups`
--
ALTER TABLE `groups`
    ADD PRIMARY KEY (`groupID`),
  ADD KEY `memberID` (`memberID`);

--
-- Indizes für die Tabelle `lists`
--
ALTER TABLE `lists`
    ADD PRIMARY KEY (`listID`),
  ADD KEY `boardID` (`boardID`);

--
-- Indizes für die Tabelle `messages`
--
ALTER TABLE `messages`
    ADD PRIMARY KEY (`id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `receiver_id` (`receiver_id`);

--
-- Indizes für die Tabelle `roles`
--
ALTER TABLE `roles`
    ADD PRIMARY KEY (`roleID`);

--
-- Indizes für die Tabelle `sessions`
--
ALTER TABLE `sessions`
    ADD PRIMARY KEY (`session_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `expires` (`expires`);

--
-- Indizes für die Tabelle `tasks`
--
ALTER TABLE `tasks`
    ADD PRIMARY KEY (`taskID`),
  ADD KEY `taskCreatorID` (`taskCreatorID`),
  ADD KEY `boardID` (`boardID`),
  ADD KEY `listID` (`listID`);

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `boards`
--
ALTER TABLE `boards`
    MODIFY `boardID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `groups`
--
ALTER TABLE `groups`
    MODIFY `groupID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `lists`
--
ALTER TABLE `lists`
    MODIFY `listID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT für Tabelle `messages`
--
ALTER TABLE `messages`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `roles`
--
ALTER TABLE `roles`
    MODIFY `roleID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `tasks`
--
ALTER TABLE `tasks`
    MODIFY `taskID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `authorizedusers`
--
ALTER TABLE `authorizedusers`
    ADD CONSTRAINT `authorizedusers_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `authorizedusers_ibfk_2` FOREIGN KEY (`taskID`) REFERENCES `tasks` (`taskID`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `boardmembers`
--
ALTER TABLE `boardmembers`
    ADD CONSTRAINT `boardmembers_ibfk_1` FOREIGN KEY (`roleID`) REFERENCES `roles` (`roleID`),
  ADD CONSTRAINT `boardmembers_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `boardmembers_ibfk_3` FOREIGN KEY (`boardID`) REFERENCES `boards` (`boardID`) ON DELETE CASCADE;

--
-- Constraints der Tabelle `groups`
--
ALTER TABLE `groups`
    ADD CONSTRAINT `groups_ibfk_1` FOREIGN KEY (`memberID`) REFERENCES `users` (`id`);

--
-- Constraints der Tabelle `lists`
--
ALTER TABLE `lists`
    ADD CONSTRAINT `lists_ibfk_1` FOREIGN KEY (`boardID`) REFERENCES `boards` (`boardID`);

--
-- Constraints der Tabelle `messages`
--
ALTER TABLE `messages`
    ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`);

--
-- Constraints der Tabelle `sessions`
--
ALTER TABLE `sessions`
    ADD CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints der Tabelle `tasks`
--
ALTER TABLE `tasks`
    ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`taskCreatorID`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`boardID`) REFERENCES `boards` (`boardID`),
  ADD CONSTRAINT `tasks_ibfk_3` FOREIGN KEY (`listID`) REFERENCES `lists` (`listID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
