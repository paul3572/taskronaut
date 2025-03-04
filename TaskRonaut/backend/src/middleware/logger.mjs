import winston from 'winston';
import {extraErrorLog, logInConsole, logInFile} from "../config/serverOptions.mjs";

const {combine, timestamp, printf, colorize} = winston.format;

const logFormat = printf(({level, message, timestamp}) => {
    return `${timestamp} ${level}: ${message}`;
});
const transports = [];

export function initalizeLogger() {
// Logging in der Konsole
    if (logInConsole) {
        transports.push(new winston.transports.Console({
            level: 'debug',
            format: combine(
                timestamp(),
                logFormat
            )
        }));
    }

// Logging in einer Datei
    if (logInFile) {
        transports.push(new winston.transports.File({
            filename: 'combined.log',
            level: 'info',
        }));
    }

// Fehler-Logs
    if (extraErrorLog) {
        transports.push(new winston.transports.File({
            filename: 'errors.log',
            level: 'error',
        }));
    }
}

initalizeLogger();

const logger = winston.createLogger({
    level: 'info',
    format: combine(
        colorize(),
        timestamp(),
        logFormat
    ),
    transports: transports

});

export default logger;