import { createPool, Pool } from 'mysql2/promise';

export const connect = async () => {
  try {
    const connection: Pool = await createPool({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      connectionLimit: 100,
    });
    return connection;
  } catch (error) {
    throw new Error(error);
  }
};
