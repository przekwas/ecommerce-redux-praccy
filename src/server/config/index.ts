import dotenv from 'dotenv';

dotenv.config();

export const config = {
    mysql: {
        host: process.env.DB_HOST as string,
        user: process.env.DB_USER as string,
        password: process.env.DB_PASS as string,
        database: process.env.DB_SCHEMA as string,
    }
}