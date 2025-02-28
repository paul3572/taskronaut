import connection from "../../database/dbCon.mjs";
import {authenticationQueries} from "../../database/dbQueries.mjs";
import logger from "../../middleware/logger.mjs";
import {errorHandler} from "../../middleware/errorHandler.js";
import {ActivationError, DatabaseError, InvalidTokenError, PermissionDeniedError, UserNotFoundError} from "../../middleware/errors.mjs";

class EmailActivationController {
    async isEmailAuthenticated(userId) {
        try {
            const [status] = await connection.query(authenticationQueries.getUserActivationStatus, [userId]);
            if (!status || status.length === 0) {
                throw new UserNotFoundError("User not found or activation status not available.");
            }
            const isUserActivated = status[0]?.activated;
            if (typeof isUserActivated === 'boolean' || isUserActivated === 1 || isUserActivated === true) {
                return {statusCode: 200, message: "User is authenticated"};
            } else {
                throw new PermissionDeniedError("User is not authenticated");
            }
        } catch (error) {
            return await errorHandler(error);
            /*
            logger.error(error);
            if (error instanceof UserNotFoundError) {
                return {statusCode: 404, message: error.message};
            } else if (error instanceof DatabaseError) {
                return {statusCode: 500, message: "Database error while checking user authentication"};
            } else if (error instanceof PermissionDeniedError) {
                return {statusCode: 401, message: "User is not authenticated"};
            } else {
                return {statusCode: 500, message: "Error while checking user authentication"};
            }

             */
        }
    }

    async activateEmail(token) {
        try {
            const [user] = await connection.query(authenticationQueries.getUserByActivationToken, [token]);
            if (!user || user.length === 0 || !user[0]) {
                throw new InvalidTokenError("Invalid token or token does not match any registered user");
            }

            const userid = user[0].id;
            if (userid === undefined) {
                throw new InvalidTokenError("Invalid token or token does not match any registered user");
            }

            const [rows] = await connection.query(authenticationQueries.updateUserActivationStatus, [true, userid]);
            if (!rows || rows.affectedRows === 0) {
                throw new ActivationError("Failed to update user activation status.");
            }

            logger.info("User activated");
            return {statusCode: 200, message: "User activation successful"};
        } catch (error) {
            return await errorHandler(error);
            /*
            logger.error(error);
            if (error instanceof InvalidTokenError) {
                return {statusCode: 400, message: error.message};
            } else if (error instanceof UserNotFoundError) {
                return {statusCode: 404, message: error.message};
            } else if (error instanceof ActivationError) {
                return {statusCode: 500, message: error.message};
            } else if (error instanceof DatabaseError) {
                return {statusCode: 500, message: "Database error while activating user"};
            } else {
                return {statusCode: 500, message: "Error while activating user"};
            }

             */
        }
    }
}

export default new EmailActivationController();