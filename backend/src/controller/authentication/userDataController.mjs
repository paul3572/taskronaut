import sessionModel from '../../models/authentication/sessionModel.mjs';
import authenticationModel from "../../models/authentication/authenticationModel.mjs";

class UserDataController {
    async loadUserData(sessionId) {
        const userId = await sessionModel.getUserIdFromSessionId(sessionId);
        const user = await authenticationModel.getUserById(userId?.userId);
        return {statusCode: 200, data: user};
    }

    async convertSessionIdToUserId(sessionId) {
        const userId = await sessionModel.getUserIdFromSessionId(sessionId);
        return {statusCode: 200, data: userId};
    }

    async loadAllSessions() {
        const sessions = await sessionModel.getAllSessionIds();
        return {statusCode: 200, data: sessions};
    }
}

export default new UserDataController();