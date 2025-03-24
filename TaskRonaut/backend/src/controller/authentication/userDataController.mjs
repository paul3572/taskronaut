import psSession from '../../database/preparedStatements/psSession.mjs';
import psAuthentication from "../../database/preparedStatements/psAuthentication.mjs";
import {errorHandler} from "../../middleware/errorHandler.js";


class UserDataController {
    async getUserData(sessionId) {
        const userId = await psSession.getUserIdFromSessionId(sessionId);
        const user = await psAuthentication.getUserById(userId?.userId);
        return {statusCode: 200, data: user};
    }

    async getUserId(sessionId) {
        const userId = await psSession.getUserIdFromSessionId(sessionId);
        return {statusCode: 200, data: userId};
    }

    async getSessions() {
        const sessions = await psSession.getAllSessionIds();
        return {statusCode: 200, data: sessions};
    }
}

export default new UserDataController();