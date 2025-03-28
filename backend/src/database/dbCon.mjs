import mysql from 'mysql2/promise';
import {config} from './../config/config.mjs';


const dbOptions = {
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};


const connection = mysql.createPool(dbOptions);

export default connection;
