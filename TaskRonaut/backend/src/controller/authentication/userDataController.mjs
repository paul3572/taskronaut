import psSession from '../../database/preparedStatements/psSession.mjs';
import psAuthentication from "../../database/preparedStatements/psAuthentication.mjs";
import {errorHandler} from "../../middleware/errorHandler.js";


class UserDataController {
    async getUserData(sessionId) {
        try {
            console.log("SESSION ID: " + sessionId);
            const userId = await psSession.getUserIdFromSessionId(sessionId);
            console.log("USER ID: " + JSON.stringify(userId));
            const user = await psAuthentication.getUserById(userId?.userId);
            console.log("USER: " + JSON.stringify(user));
            return {statusCode: 200, data: user};
        } catch (error) {
            return await errorHandler(error);
        }
    }

    async getUserId(sessionId) {
        try {
            console.log("SESSION ID: " + sessionId);
            const userId = await psSession.getUserIdFromSessionId(sessionId);
            console.log("USER: " + JSON.stringify(userId));
            return {statusCode: 200, data: userId};
        } catch (error) {
            return await errorHandler(error);
        }
    }

    async getSessions() {
        try {
            const sessions = await psSession.getAllSessionIds();
            return {statusCode: 200, data: sessions};
        } catch (error) {
            return await errorHandler(error);
        }

    }
}

export default new UserDataController();