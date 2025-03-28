import session from 'express-session';
import MySQLStore from 'express-mysql-session';
import dbConnection from '../database/dbCon.mjs';
import logger from "./logger.mjs";
import chalk from "chalk";
import {styles} from "../config/loggingStyle.mjs";
import psAuthentication from "../models/authentication/authenticationModel.mjs";
import {InvalidSessionError} from "../config/errors.mjs";

const MySQLSessionStore = MySQLStore(session);

const sessionMiddleware = session({
    key: 'session_cookie_name',
    secret: 'password',
    store: new MySQLSessionStore({}, dbConnection),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    },
});

export default sessionMiddleware;

/**
 * Startet eine Session und speichert die userId in der Session-Datenbank-Tabelle
 * @param req
 * @param userId
 */
export async function startSession(req, userId) {
    logger.info(chalk.hex(styles.info)`Starten der Session für User-ID:${userId}`);
    req.session.userId = userId;
    req.session.save((err) => {
        if (err) {
            logger.error(chalk.hex(styles.critical)`Fehler beim Speichern der Session:${err}`);
        } else {
            logger.info(chalk.hex(styles.info)`Session für User-ID ${userId} gestartet und gespeichert.`);
        }
    });
}

/**
 * Überprüft, ob eine Session existiert und der User eingeloggt ist
 * @param req
 * @param res
 * @param next
 */
export function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        logger.info(chalk.hex(styles.info)`Session gefunden, User-ID: ${req.session.userId}`);
        return next();
    } else {
        res.status(401).send('Nicht autorisiert');
    }
}

/**
 * Zerstört die Session beim Logout
 * @param req
 * @param res
 */
export async function destroySession(req, res) {
    req.session.destroy((error) => {
        if (error) {
            logger.error(chalk.hex(styles.critical)`Error while logging out: ${error}`);
            res.status(500).send("Fehler beim Logout");
        } else {
            logger.info("Session erfolgreich zerstört.");
            res.clearCookie('session_cookie_name');
            res.send("Erfolgreich ausgeloggt");
        }
    });
}

export async function findUserBySessionId(sessionId) {
    if (await isCookieValid(sessionId)) {
        const userFromSessionX = await psAuthentication.getUserIdBySessionId(sessionId);
        //logger.debug(chalk.hex(styles.debug)`HIER DIE AUS DEM FRONTEND: ${JSON.stringify(sessionId)}`);
        //logger.debug(chalk.hex(styles.debug)`HIER DIE AUS DER DB: ${JSON.stringify(userFromSessionX)}`);
        return userFromSessionX;
    } else {
        throw new InvalidSessionError("Invalid cookie");
    }
}

async function isCookieValid(sessionId) {
    return true;
}