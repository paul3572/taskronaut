import dotenv from 'dotenv';

dotenv.config();

export const config = {
    db: {
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        host: process.env.MYSQL_HOST,
    },
    server: {
        port: process.env.PORT,
        domainName: process.env.DOMAIN_NAME,

    },
    nodeMailer: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE,
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
};
