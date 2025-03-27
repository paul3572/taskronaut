import mysql from 'mysql2/promise';
import {config} from './../config/config.mjs';

/**
 * Verwendung von "Pools" da man da mehrere abfragen gleichzeitig machen kann
 * @type {{queueLimit: number, password: string, database: string, waitForConnections: boolean, connectionLimit: number, host: string, user: string}}
 */
const dbOptions = {
    //host: 'localhost',
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
