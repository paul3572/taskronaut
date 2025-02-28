import router from "./boardRoutes.mjs";
import listController from "../../controller/board/listController.mjs";
import {serverResponse} from "../../middleware/serverResponse.mjs";
import chalk from "chalk";
import {styles} from "../../database/loggingStyle.mjs";
import logger from "../../middleware/logger.mjs";

router.get('/lists', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)`LIST REQUESTED: `);
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    await serverResponse(res, await listController.listRequest());
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});


router.post('/lists/board', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)`BOARD-LISTS REQUESTED: `);
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const {sessionId, boardId} = req.body;
    await serverResponse(res, await listController.listsForBoard(sessionId, boardId));
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

router.post('/lists', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)`NEW LIST: `);
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));

    const {sessionId, boardId, listName} =  req.body;
    await serverResponse(res, await listController.createList(sessionId, boardId, listName));
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

router.delete('/lists/:id', async (req, res) => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.dialogStart)`DELETE LIST: `);
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter URL: ${JSON.stringify(req.params)}`));
    logger.debug(chalk.hex(styles.debug)(`Übergabe Parameter Body: ${JSON.stringify(req.body)}`));
    const listId = req.params.id;
    logger.info(`DELETE LIST ID: ${listId}`);
    await serverResponse(res, await listController.removeList(listId));
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});

export default router;
