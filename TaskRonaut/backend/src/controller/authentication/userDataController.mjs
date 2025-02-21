import {getAllSessionIds, getUserIdFromSessionId} from '../../database/preparedStatements/psSession.mjs';
import {getUserById} from "../../database/preparedStatements/psAuthentication.mjs";

export async function getUserData(sessionId) {
    console.log("SESSION ID: " + sessionId);
    const userId = await getUserIdFromSessionId(sessionId);
    console.log("USER ID: " + JSON.stringify(userId));
    const user = await getUserById(userId?.userId);
    console.log("USER: " + JSON.stringify(user));
    return {statusCode: 200, data: user};
}
export async function getUserId(sessionId) {
    console.log("SESSION ID: " + sessionId);
    const userId = await getUserIdFromSessionId(sessionId);
    console.log("USER: " + JSON.stringify(userId));
    return {statusCode: 200, data: userId};
}
export async function getSessions(){
    const sessions = await getAllSessionIds();
    return {statusCode: 200, data: sessions};
}