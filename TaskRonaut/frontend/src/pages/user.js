import { serverURL } from "@/pages/conf.js";

let sessionCookie = null;
let sessionId = null;
let userId = null;
let firstName = null;
let lastName = null;
let email = null;

if (typeof window !== 'undefined') {
    sessionCookie = JSON.parse(sessionStorage.getItem('sessionCookie'));
    sessionId = JSON.parse(sessionStorage.getItem('sessionID'));
    userId = sessionId ? await getUserId(sessionId) : null;
    if (sessionId !== null) {
        await getCompleteUser(sessionId);
        const user = JSON.parse(sessionStorage.getItem('user'));
        const rawFirstName = user?.firstName ?? '';
        const rawLastName = user?.lastName ?? '';
        firstName = rawFirstName ? rawFirstName.charAt(0).toUpperCase() + rawFirstName.slice(1) : null;
        lastName = rawLastName ? rawLastName.charAt(0).toUpperCase() + rawLastName.slice(1) : null;
        email = user?.email ?? null;
    }

    console.log("COOKIE: " + JSON.stringify(sessionCookie));
    console.log("SESSION ID: " + JSON.stringify(sessionId));
    console.log("USER: " + JSON.stringify(JSON.parse(sessionStorage.getItem('user'))));
}

async function getUserId(sessionId) {
    try {
        const response = await fetch(`${serverURL}/user/userId`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sessionId: sessionId })
        });
        const data = await response.json();
        const userId = data.data.user_id;
        sessionStorage.setItem('userId', JSON.stringify(userId));
        return userId;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

async function getCompleteUser(sessionId) {
    try {
        const response = await fetch(`${serverURL}/user/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sessionId: sessionId })
        });
        const data = await response.json();
        sessionStorage.setItem('user', JSON.stringify(data.data));
        console.log(JSON.stringify(data.data));
    } catch (error) {
        console.error('Error fetching user:', error);
    }
}

async function logout(sessionId) {
    try {
        const response = await fetch(`${serverURL}/user/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sessionId: sessionId })
        });
        const data = await response.json();
        console.log(data);
        sessionStorage.removeItem('sessionCookie');
        sessionStorage.removeItem('sessionID');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('userId');
        window.location.href = '/login';
    } catch (error) {
        console.error('Error logging out:', error);
    }
}

export { sessionCookie, sessionId, userId, firstName, lastName, email, logout };