/**
 * Generates the SHA-256 hash of a given input string.
 *
 * This function encodes the input string into a Uint8Array, computes the
 * SHA-256 hash using the SubtleCrypto API, and returns the hash as a
 * hexadecimal string.
 *
 * @param {string} message - The input data to be hashed. This is expected to be a UTF-8 string.
 * @returns {Promise<string>} - A promise that resolves to the SHA-256 hash as a hexadecimal string.
 *
 */
export async function sha256(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}