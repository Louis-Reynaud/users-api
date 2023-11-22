import * as db from "zapatos/db";

export const initDB = async () => {
  db.sql`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        );
    `;
  db.sql`
          INSERT INTO users (email, password) VALUES ('example@example.com', 'motdepasse123');
      `;
};
