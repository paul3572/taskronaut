import psSession from '../../database/preparedStatements/psSession.mjs';
import psAuthentication from "../../database/preparedStatements/psAuthentication.mjs";
import {errorHandler} from "../../middleware/errorHandler.js";


class UserDataController {
    async getUserData(sessionId) {
        try {
            const userId = await psSession.getUserIdFromSessionId(sessionId);
            const user = await psAuthentication.getUserById(userId?.userId);
            return {statusCode: 200, data: user};
        } catch (error) {
            return await errorHandler(error);
        }
    }

    async getUserId(sessionId) {
        try {
            const userId = await psSession.getUserIdFromSessionId(sessionId);
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