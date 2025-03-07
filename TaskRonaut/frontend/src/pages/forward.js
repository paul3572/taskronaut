const HTTP_STATUS = {
    BAD_REQUEST: 400, CREATED: 201, OK: 200, CONFLICT: 409, Internal_Server_Error: 500, Unauthorized: 401, Bad_Gateway: 502
};

function updateResponse(color, message) {
    const responseElement = document.querySelector('#response');
    if (responseElement) {
        responseElement.style.color = color;
        responseElement.innerHTML = message;
    }
}

export function forwarding(event) {
    const {xhr, successful: isSuccessful, failed: isFailed, target} = event.detail;
    const status = xhr.status;
    const responseText = xhr.responseText;

    const requestOrigin = new URL(xhr.responseURL).origin + "/api";
    if (requestOrigin !== "http://taskronaut.at/api") {
        console.error("Ungültige Anfrage von:", requestOrigin, ". Expected: " + "http://taskronaut.at/api");
        return;
    }

    switch (status) {
        case HTTP_STATUS.BAD_REQUEST:
            let errorMessage = responseText || "Ein Fehler ist aufgetreten. Bitte versuche es erneut.";
            try {
                const errorData = JSON.parse(responseText);
                if (window.location.pathname === "/register") {
                    errorMessage = "Registrierung fehlgeschlagen.<br>Bitte überprüfen Sie Ihre Eingaben und versuchen Sie es erneut.";
                } else if (window.location.pathname === "/login") {
                    errorMessage = "Falsches Passwort oder E-Mail-Adresse. Bitte versuchen Sie es erneut.";

                }
            } catch (error) {
                console.error("Fehler beim Parsen der JSON-Antwort:", error);
            }
            updateResponse('#c40000', errorMessage);
            console.error(`Fehler ${status}:`, errorMessage);
            break;

        case HTTP_STATUS.CREATED:
            if (window.location.pathname === "/register") {
                updateResponse('#009900', "Erfolgreich erstellt!");
                // console.log("Erstellung erfolgreich!");

                // Parse the JSON response and store it in local storage
                try {
                    const data = JSON.parse(responseText);
                    localStorage.setItem('registerData', JSON.stringify(data));
                } catch (error) {
                    console.error("Fehler beim Parsen der JSON-Antwort:", error);
                }

                setTimeout(() => {
                    window.location.href = '/emailConfirmation';
                }, 100);
            }
            break;

        case HTTP_STATUS.Unauthorized && HTTP_STATUS.Internal_Server_Error:
            let unauthorizedErrorMessage = responseText || "Ein Fehler ist aufgetreten. Bitte versuche es erneut.";
            try {
                const errorData = JSON.parse(responseText);
                if (window.location.pathname === "/login") {
                    unauthorizedErrorMessage = "Falsches Passwort oder E-Mail-Adresse. Bitte versuchen Sie es erneut.";
                }
            } catch (error) {
                console.error("Fehler beim Parsen der JSON-Antwort:", error);
            }
            updateResponse('#c40000', unauthorizedErrorMessage);
            console.error(`Fehler ${status}:`, unauthorizedErrorMessage);
            break;

        case HTTP_STATUS.OK:
            // Überprüfen, ob die aktuelle Seite die Login-Seite ist und die Antwort vom Login-Endpunkt kommt
            if (window.location.pathname === "/login" && xhr.responseURL.includes("/api/authentication/login")) {
                updateResponse('#009900', "Erfolgreich eingeloggt!");
                // console.log("Login erfolgreich!");

                try {
                    const data = JSON.parse(responseText);
                    const sessionCookie = data.data.session;
                    const sessionId = data.data.session.sessionId;
                    sessionStorage.setItem('sessionCookie', JSON.stringify(sessionCookie));
                    sessionStorage.setItem('sessionID', JSON.stringify(sessionId));
                } catch (error) {
                    console.error("Fehler beim Parsen der JSON-Antwort:", error);
                }

                setTimeout(() => {
                    window.location.href = '/getCookies';
                }, 100);
            }
            break;

        case HTTP_STATUS.Bad_Gateway:
            try {
                const errorData = JSON.parse(responseText);
                if (window.location.pathname === "/register") {
                    errorMessage = "Registrierung fehlgeschlagen.<br>Bitte überprüfen Sie Ihre Eingaben und versuchen Sie es erneut.";
                } else if (window.location.pathname === "/login") {
                    errorMessage = "Falsches Passwort oder E-Mail-Adresse. Bitte versuchen Sie es erneut.";

                }
            } catch (error) {
                console.error("Fehler beim Parsen der JSON-Antwort:", error);
            }
            updateResponse('#c40000', errorMessage);
            console.error(`Fehler ${status}:`, errorMessage);
            break;

        case HTTP_STATUS.CONFLICT:
            let emailErrorMessage = responseText || "Ein Fehler ist aufgetreten. Bitte versuche es erneut.";
            try {
                const errorData = JSON.parse(responseText);
                if (window.location.pathname === "/register") {
                    emailErrorMessage = "Diese E-Mail-Adresse ist bereits registriert.<br>Bitte melden Sie sich an oder verwenden Sie eine andere E-Mail-Adresse.";
                }
            } catch (error) {
                console.error("Fehler beim Parsen der JSON-Antwort:", error);
            }
            updateResponse('#c40000', emailErrorMessage);
            console.error(`Fehler ${status}:`, emailErrorMessage);
            break;

        default:
            // console.log("Antwortstatus:", status);
            break;
    }

    if (isSuccessful) {
        /*
        console.log("Anfrage erfolgreich:", {
            status, responseText, target,
        });
        */
    } else if (isFailed) {
        console.error("Anfrage fehlgeschlagen:", {
            status, responseText, target,
        });
    }
}