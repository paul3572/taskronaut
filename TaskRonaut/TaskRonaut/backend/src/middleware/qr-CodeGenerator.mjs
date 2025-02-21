import qrcode from 'qrcode';
import logger from "./logger.mjs";

export async function generateQrCode(data) {
    try {
        const qrCodeData = await qrcode.toDataURL(data);
        return qrCodeData;
    } catch (err) {
        logger.error('Error generating QR code', err);
        throw err;
    }
}