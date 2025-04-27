import { DatabaseSync } from 'node:sqlite';
const db = new DatabaseSync(":memory:");

// ^ USER TABLE
db.exec(
  `      
   CREATE TABLE users(
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     username TEXT UNIQUE,
     password TEXT
   );
`
);

// ^ TODO TABLE
db.exec(
  `      
   CREATE TABLE todos(
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     user_id INTEGER,
     task TEXT,
     completed BOOLEAN DEFAULT FALSE,
     FOREIGN KEY(user_id) REFERENCES users(id)
   );
`
);
export default db;
