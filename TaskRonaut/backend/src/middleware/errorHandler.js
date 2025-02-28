import logger from "./logger.mjs";
import chalk from "chalk";
import {styles} from "../database/loggingStyle.mjs";
import {
    ActivationError, ActivationTokenNotFoundError,
    BoardNotFoundError, DatabaseConnectionError,
    DatabaseError,
    EmailAlreadyInUseError,
    InvalidInputError,
    InvalidLoginDataError,
    InvalidSessionError,
    InvalidTokenError,
    NoBoardsFoundError,
    PermissionDeniedError,
    QueryExecutionError, UserIsAlreadyMember, UserIsAlreadyMemberError,
    UserNotFoundError
} from "./errors.mjs";


export async function errorHandler(error) {
    if (error instanceof UserNotFoundError) {
        logger.error(chalk.hex(styles.critical)`ERROR: ${error.message}`);
        return {statusCode: 500};
    } else if (error instanceof NoBoardsFoundError) {
        logger.error(chalk.hex(styles.critical)`ERROR: ${error.message}`);
        return {statusCode: 500};
    } else if (error instanceof BoardNotFoundError) {
        logger.error(chalk.hex(styles.critical)`ERROR: ${error.message}`);
        return {statusCode: 500};
    } else if (error instanceof QueryExecutionError) {
        logger.error(chalk.hex(styles.critical)`DATABASE ERROR: ${error.message}`);
        return {statusCode: 500};
    } else if (error instanceof ActivationError) {
        logger.error(chalk.hex(styles.critical)`ERROR: ${error.message}`);
        return {statusCode: 500};
    } else if (error instanceof DatabaseError) {
        logger.error(chalk.hex(styles.critical)`DATABASE ERROR: ${error.message}`);
        return {statusCode: 500};
    } else if (error instanceof PermissionDeniedError) {
        logger.error(chalk.hex(styles.critical)`ERROR: ${error.message}`);
        return {statusCode: 403};
    } else if (error instanceof InvalidTokenError) {
        logger.error(chalk.hex(styles.critical)`ERROR: ${error.message}`);
        return {statusCode: 401};
    } else if (error instanceof InvalidSessionError) {
        logger.error(chalk.hex(styles.critical)`ERROR: ${error.message}`);
        return {statusCode: 401};
    } else if (error instanceof InvalidInputError) {
        logger.error(chalk.hex(styles.critical)`ERROR: ${error.message}`);
        return {statusCode: 400};
    } else if (error instanceof InvalidLoginDataError) {
        logger.error(chalk.hex(styles.critical)`ERROR: ${error.message}`);
        return {statusCode: 401};
    } else if (error instanceof EmailAlreadyInUseError) {
        logger.error(chalk.hex(styles.critical)`ERROR: ${error.message}`);
        return {statusCode: 409};
    }
    else if (error instanceof UserIsAlreadyMemberError) {
        logger.error(chalk.hex(styles.critical)`ERROR: ${error.message}`);
        return {statusCode: 401};
    }
    else if (error instanceof ActivationTokenNotFoundError) {
        logger.error(chalk.hex(styles.critical)`ERROR: ${error.message}`);
        return {statusCode: 404};
    } else if (error instanceof DatabaseConnectionError) {
        logger.error(chalk.hex(styles.critical)`DATABASE CONNECTION ERROR: ${error.message}`);
        return {statusCode: 500};
    } else {
        logger.error(chalk.hex(styles.critical)`UNHANDLED ERROR: ${JSON.stringify(error)}`);
        return {statusCode: 500};
    }
}