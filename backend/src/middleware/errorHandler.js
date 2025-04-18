import logger from "./logger.mjs";
import chalk from "chalk";
import {styles} from "../config/loggingStyle.mjs";
import {
    ActivationError, ActivationTokenNotFoundError,
    BoardNotFoundError, DatabaseConnectionError,
    DatabaseError,
    EmailAlreadyInUseError, EmailSendingError,
    InvalidInputError,
    InvalidLoginDataError,
    InvalidSessionError,
    InvalidTokenError,
    NoBoardsFoundError, NoMessagesFoundError,
    PermissionDeniedError,
    QueryExecutionError, UserIsAlreadyMemberError, UserNotActivatedError,
    UserNotFoundError
} from "../config/errors.mjs";

export async function errorHandler(error) {
    const errorMessage = `ERROR: ${error.message}`;
    const errorDetails = `Error Name: ${error.name}, Stack: ${error.stack}`;

    if (error instanceof UserNotFoundError) {
        logger.error(chalk.hex(styles.critical)`${errorMessage}`);
        logger.debug(chalk.hex(styles.debug)`${errorDetails}`);
        return {statusCode: 404};
    } else if (error instanceof NoBoardsFoundError) {
        logger.error(chalk.hex(styles.critical)`${errorMessage}`);
        logger.debug(chalk.hex(styles.debug)`${errorDetails}`);
        return {statusCode: 404};
    } else if (error instanceof BoardNotFoundError) {
        logger.error(chalk.hex(styles.critical)`${errorMessage}`);
        logger.debug(chalk.hex(styles.debug)`${errorDetails}`);
        return {statusCode: 404};
    } else if (error instanceof QueryExecutionError) {
        logger.error(chalk.hex(styles.critical)`DATABASE ERROR: ${error.message}`);
        logger.debug(chalk.hex(styles.debug)`${errorDetails}`);
        return {statusCode: 500};
    } else if (error instanceof ActivationError) {
        logger.error(chalk.hex(styles.critical)`${errorMessage}`);
        logger.debug(chalk.hex(styles.debug)`${errorDetails}`);
        return {statusCode: 400};
    } else if (error instanceof DatabaseError) {
        logger.error(chalk.hex(styles.critical)`DATABASE ERROR: ${error.message}`);
        logger.debug(chalk.hex(styles.debug)`${errorDetails}`);
        return {statusCode: 500};
    } else if (error instanceof PermissionDeniedError) {
        logger.error(chalk.hex(styles.critical)`${errorMessage}`);
        logger.debug(chalk.hex(styles.debug)`${errorDetails}`);
        return {statusCode: 403};
    } else if (error instanceof InvalidTokenError) {
        logger.error(chalk.hex(styles.critical)`${errorMessage}`);
        logger.debug(chalk.hex(styles.debug)`${errorDetails}`);
        return {statusCode: 401};
    } else if (error instanceof NoMessagesFoundError) {
        logger.error(chalk.hex(styles.critical)`${errorMessage}`);
        logger.debug(chalk.hex(styles.debug)`${errorDetails}`);
        return {statusCode: 401};
    } else if (error instanceof InvalidSessionError) {
        logger.error(chalk.hex(styles.critical)`${errorMessage}`);
        logger.debug(chalk.hex(styles.debug)`${errorDetails}`);
        return {statusCode: 401};
    } else if (error instanceof InvalidInputError) {
        logger.error(chalk.hex(styles.critical)`${errorMessage}`);
        logger.debug(chalk.hex(styles.debug)`${errorDetails}`);
        return {statusCode: 400};
    } else if (error instanceof InvalidLoginDataError) {
        logger.error(chalk.hex(styles.critical)`${errorMessage}`);
        logger.debug(chalk.hex(styles.debug)`${errorDetails}`);
        return {statusCode: 401};
    } else if (error instanceof UserNotActivatedError) {
        logger.error(chalk.hex(styles.critical)`${errorMessage}`);
        logger.debug(chalk.hex(styles.debug)`${errorDetails}`);
        return {statusCode: 401};
    } else if (error instanceof EmailAlreadyInUseError) {
        logger.error(chalk.hex(styles.critical)`${errorMessage}`);
        logger.debug(chalk.hex(styles.debug)`${errorDetails}`);
        return {statusCode: 409};
    } else if (error instanceof UserIsAlreadyMemberError) {
        logger.error(chalk.hex(styles.critical)`${errorMessage}`);
        logger.debug(chalk.hex(styles.debug)`${errorDetails}`);
        return {statusCode: 409};
    } else if (error instanceof ActivationTokenNotFoundError) {
        logger.error(chalk.hex(styles.critical)`${errorMessage}`);
        logger.debug(chalk.hex(styles.debug)`${errorDetails}`);
        return {statusCode: 404};
    } else if (error instanceof DatabaseConnectionError) {
        logger.error(chalk.hex(styles.critical)`DATABASE CONNECTION ERROR: ${error.message}`);
        logger.debug(chalk.hex(styles.debug)`${errorDetails}`);
        return {statusCode: 500};
    } else if (error instanceof EmailSendingError) {
        logger.error(chalk.hex(styles.critical)`EMAIL SENDING ERROR: ${error.message}`);
        logger.debug(chalk.hex(styles.debug)`${errorDetails}`);
        return {statusCode: 500};
    } else {
        logger.error(chalk.hex(styles.critical)`UNHANDLED ERROR: ${JSON.stringify(error)}`);
        logger.debug(chalk.hex(styles.debug)`${errorDetails}`);
        return {statusCode: 500};
    }
}