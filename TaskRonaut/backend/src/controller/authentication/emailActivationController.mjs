import connection from "../../database/dbCon.mjs";
import {authenticationQueries} from "../../database/dbQueries.mjs";
import logger from "../../middleware/logger.mjs";

export async function isEmailAuthenticated(userId) {
    try {
        const [status] = await connection.query(authenticationQueries.getUserActivationStatus, [userId]);
        // TODO: Check if the user is activated
        const isUserActivated = status[0]?.activated;
        if (typeof isUserActivated === 'boolean' || isUserActivated === 1 || isUserActivated === true) {
            return {statusCode: 200, message: "User is authenticated",};
        } else {
            return {statusCode: 401, message: "User is not authenticated",};
        }
    } catch (e) {
        logger.error(e);
        return {statusCode: 500, message: "Error while checking user authentication",};
    }
}


export async function activateEmail(token) {
    try {
        const [user] = await connection.query(authenticationQueries.getUserByActivationToken, [token]);
        const userid = user[0]?.id;
        console.log(userid);

        if (user != null) {
            try {
                if (userid === undefined) {
                    return {statusCode: 400, message: "Invalid token or token does not match any registered user",};
                }
                const [rows] = await connection.query(authenticationQueries.updateUserActivationStatus, [true, userid]);
                logger.info("User activated");
                return {statusCode: 200, message: "User activation successful",};
            } catch (e) {
                logger.error(e);
                return {statusCode: 500, message: "Error while updating user activation status",};
            }
        } else {
            logger.info("Token matches no registered user");
            return {statusCode: 404, message: "Token does not match any registered user",};
        }
    } catch (e) {
        logger.error(e);
        return {statusCode: 500,};
    }
}
