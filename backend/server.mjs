import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import chalk from 'chalk';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './src/config/swaggerAll.json' assert {type: 'json'};


import testRoutes from './testRoutes.mjs';
import dragANDdropRoutes from './src/routes/board/drag&dropRoutes.mjs';
import ptpRoutes from './src/routes/chat/ptpRoutes.mjs';
import boardChatRoutes from './src/routes/chat/BoardChatRoutes.mjs';
import loginRoutes from './src/routes/authentication/loginRoutes.mjs';
import taskRoutes from './src/routes/board/taskRoutes.mjs';
import boardRoutes from './src/routes/board/boardRoutes.mjs';
import listRoutes from './src/routes/board/listsRoutes.mjs';
import userDataRoutes from "./src/routes/authentication/userDataRoutes.mjs";
import {styles} from "./src/config/loggingStyle.mjs";
import logger from "./src/middleware/logger.mjs";
import boardMemberRoutes from "./src/routes/board/boardMemberRoutes.mjs";
import { config } from './src/config/config.mjs';


logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
logger.info(chalk.hex(styles.serverProcess)('Server is starting...'));

const app = express();


app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: ['https://taskronaut.at'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}
));
app.use(express.json());
app.use(cookieParser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const apiRouter = express.Router();

apiRouter.use('/authentication', loginRoutes);
apiRouter.use('/ptp', ptpRoutes);
apiRouter.use('/boardChat', boardChatRoutes);
apiRouter.use('/tasks', taskRoutes);
apiRouter.use('/boards', boardRoutes);
apiRouter.use('/lists', listRoutes);
apiRouter.use('/user', userDataRoutes);
apiRouter.use('/dragANDdrop', dragANDdropRoutes);
apiRouter.use('/board-members', boardMemberRoutes);

app.use('/api', apiRouter);
app.use(testRoutes);

app.listen(config.server.port, async () => {
    logger.info(chalk.hex(styles.serverStatusInfo)(`Server running at https://${config.server.domainName}:${config.server.port}`));
    logger.info(chalk.hex(styles.serverStatusInfo)(`SwaggerUI available at https://${config.server.domainName}:${config.server.port}/api-docs`));
    logger.info(chalk.hex(styles.serverStatusInfo)(`Website is reachable at https://${config.server.domainName}:4321`));
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});
