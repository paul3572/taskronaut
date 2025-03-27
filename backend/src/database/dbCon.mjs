import mysql from 'mysql2/promise';

/**
 * Verwendung von "Pools" da man da mehrere abfragen gleichzeitig machen kann
 * @type {{queueLimit: number, password: string, database: string, waitForConnections: boolean, connectionLimit: number, host: string, user: string}}
 */
const dbOptions = {
    //host: 'localhost',
    host: 'datenbank',
    user: 'root',
    password: '',
    database: 'TaskRonaut',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};


const connection = mysql.createPool(dbOptions);

export default connection;
