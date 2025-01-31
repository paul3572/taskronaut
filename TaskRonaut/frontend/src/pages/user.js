import {serverURL} from "@/pages/conf.js";

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
    if (sessionId !== null ) {
        await getCompleteUser(sessionId);
        console.log(JSON.parse(sessionStorage.getItem('user'))?.firstName);
        firstName = (JSON.parse(sessionStorage.getItem('user'))?.firstName).charAt(0).toUpperCase() + (JSON.parse(sessionStorage.getItem('user'))?.firstName).slice(1) ?? null;
        lastName = (JSON.parse(sessionStorage.getItem('user'))?.lastName).charAt(0).toUpperCase() + (JSON.parse(sessionStorage.getItem('user'))?.lastName).slice(1) ?? null;email = JSON.parse(sessionStorage.getItem('user'))?.email ?? null;
    }

    console.log("COOKIE: " + JSON.stringify(sessionCookie));
    console.log("SESSION ID: " + JSON.stringify(sessionId));
    console.log("USER: " + JSON.stringify(JSON.parse(sessionStorage.getItem('user'))));
}
async function getUserId(sessionId) {
    try {
        const response = await fetch(`${serverURL}/userId`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({sessionId: sessionId})
        });
        const data = await response.json();
        const userId = data.data.user_id;
        // Nur die Zahl der User-Id wird zurückgegeben
        sessionStorage.setItem('userId', JSON.stringify(userId));
        return userId;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}
async function getCompleteUser(sessionId) {
    fetch(`${serverURL}/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({sessionId: sessionId})
    })
        .then(response => response.json())
        .then(data => {
            sessionStorage.setItem('user', JSON.stringify(data.data));
                console.log(JSON.stringify(data.data));
        })
        .catch(error => {
            console.error('Error fetching user:', error);
        });
}

async function logout(sessionId) {
    fetch(`${serverURL}/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({sessionId: sessionId})
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            sessionStorage.removeItem('sessionCookie');
            sessionStorage.removeItem('sessionID');
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('userId');
            window.location.href = '/login';
        })
        .catch(error => {
            console.error('Error logging out:', error);
        });
}


export {sessionCookie, sessionId, userId, firstName, lastName, email, logout};