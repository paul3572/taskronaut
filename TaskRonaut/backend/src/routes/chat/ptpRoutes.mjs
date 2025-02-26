import {Router} from 'express';
import dbConnection from '../../database/dbCon.mjs';
import {messageQueries} from "../../database/dbQueries.mjs";
import chalk from "chalk";
import {styles} from "../../database/loggingStyle.mjs";
import logger from "../../middleware/logger.mjs";

const router = Router();


router.get('/get-messages', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)`MESSAGES REQUESTED: `);
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    try {
        const [rows] = await dbConnection.query(messageQueries.getAllMessages);
        const html = rows.map(message => `<div><strong>${message.from}</strong> to <strong>${message.to}</strong>: ${message.content}</div>`).join('');
        res.send(html);
    } catch (error) {
        logger.error(error);
        res.status(500).send('Internal Server Error');
    }
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

router.post('/add-messages', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)`NEW MESSAGE: `);
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const {from, to, content} = req.body;

    if (from && to && content) {
        try {
            const [result] = await dbConnection.query(messageQueries.addMessage, [from, to, content]);
            const [rows] = await dbConnection.query(messageQueries.getMessageById, [result.insertId]);
            const newMessage = rows[0];
            const html = `<div><strong>${newMessage.from}</strong> to <strong>${newMessage.to}</strong>: ${newMessage.content}</div>`;
            res.send(html);
        } catch (error) {
            logger.error(error);
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.status(400).send('Missing message details');
    }
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

export default router;
