export async function post({ request }) {
    try {
        const body = await request.json();
        const { sessionId } = body;

        if (!sessionId) {
            return new Response(
                JSON.stringify({ error: "Missing sessionId" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Hier kannst du die Session ID serverseitig speichern (z. B. in einer Datenbank)
        console.log(`Received sessionId: ${sessionId}`);

        return new Response(
            JSON.stringify({ message: "Session ID saved successfully!" }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Error processing request" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
