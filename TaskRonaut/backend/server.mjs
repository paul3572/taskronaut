import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import chalk from 'chalk';
import swaggerDocument from './src/config/swaggerAll.json' assert {type: 'json'};

import sessions from './src/middleware/session.mjs'
import testRoutes from './testRoutes.mjs';
import ptpRoutes from './src/routes/chat/ptpRoutes.mjs';
import loginRoutes from './src/routes/authentication/loginRoutes.mjs';
import taskRoutes from './src/routes/board/taskRoutes.mjs';
import boardRoutes from './src/routes/board/boardRoutes.mjs';
import listRoutes from './src/routes/board/listsRoutes.mjs';
import userDataRoutes from "./src/routes/authentication/userDataRoutes.mjs";
import {styles} from "./src/database/loggingStyle.mjs";
import logger from "./src/middleware/logger.mjs";
import {domainName, port} from "./src/config/serverOptions.mjs";
import sessionMiddleware from './src/middleware/session.mjs';


const app = express();


app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const apiRouter = express.Router();

apiRouter.use('/authentication', loginRoutes);
apiRouter.use('/chat', ptpRoutes);
apiRouter.use('/tasks', taskRoutes);
apiRouter.use('/boards', boardRoutes);
apiRouter.use('/lists', listRoutes);
apiRouter.use('/user', userDataRoutes);

app.use('/api', apiRouter);
app.use(testRoutes);

app.listen(port, async () => {
    logger.info(chalk.hex(styles.dSLColour)(styles.dialogStartLine));
    logger.info(chalk.hex(styles.serverProcess)('Server is starting...'));
    logger.info(chalk.hex(styles.serverStatusInfo)(`Server running at http://${domainName}:${port}`));
    logger.info(chalk.hex(styles.serverStatusInfo)(`SwaggerUI available at http://${domainName}:${port}/api-docs`));
    logger.info(chalk.hex(styles.serverStatusInfo)(`Website is reachable at http://${domainName}:4321`));
    logger.info(chalk.hex(styles.dELColour)(styles.dialogEndLine));
});
