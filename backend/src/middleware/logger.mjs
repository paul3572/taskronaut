import winston from 'winston';
import {extraErrorLog, logInConsole, logInFile} from "../config/serverOptions.mjs";

const transports = [];
const {combine, timestamp, printf, colorize} = winston.format;
const logFormat = printf(({level, message, timestamp}) => {
    return `${timestamp} ${level}: ${message}`;
});

export async function initializeLogger() {
    if (logInConsole) {
        transports.push(new winston.transports.Console({
            level: 'debug',
            format: combine(
                timestamp(),
                logFormat
            )
        }));
    }

    if (logInFile) {
        transports.push(new winston.transports.File({
            filename: 'combined.log',
            level: 'info',
        }));
    }

    if (extraErrorLog) {
        transports.push(new winston.transports.File({
            filename: 'errors.log',
            level: 'error',
        }));
    }
}

await initializeLogger();

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