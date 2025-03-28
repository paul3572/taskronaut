import logger from "./src/middleware/logger.mjs";
import chalk from "chalk";
import {styles} from "./src/config/loggingStyle.mjs";
import {serverResponse} from "./src/middleware/serverResponse.mjs";
import {Router} from "express";

const router = Router();
router.get('/api/test', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)`TEST GET: `);
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    await serverResponse(res, {statusCode: 200, data: "true"});
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});
export default router;