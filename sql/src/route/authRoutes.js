import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  // encrypt the password
  const hashedPass = bcrypt.hashSync(password, 8);
  console.log(hashedPass);

  // saving new user and hashed password
  try {
    const insertUser = db.prepare(`INSERT INTO users(username, password)
     VALUES ( ? ,?)`);
    const result = insertUser.run(username, hashedPass);

    const defaultTodo = `Hello :) Add your first ToDo!`;
    const insertTodo = db.prepare(
      `INSERT INTO todos (user_id, task) VALUES(?, ?)`
    );

    insertTodo.run(result.lastInsertRowid, defaultTodo);
    // Create a token

    const token = jwt.sign(
      { id: result.lastInsertRowid },
      process.env.JWT_TOKEN,
      { expiresIn: "24h" }
    );
    res.json({ token });
    console.log(token);
  } catch (err) {
    console.log(err);
    res.sendStatus(503);
  }
});

// ^ ===========================================================

// ! we get their email, and we look up the password associated with that email in the database

// but when we get it back and see it's encrypted, which means that we cannot compare it to the one the user just tring to logoin

// so what we can to do ,is agin one way encryption the password the user just entered

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  try {
    const getUser = db.prepare(`SELECT * FROM users WHERE username = ?`);
    const user = getUser.get(username);
    // checking user is valid ?
    if (!user) {
      return res.sendStatus(404).json({ message: "User not found " });
    }

    const validPass = bcrypt.compareSync(password, user.password);
    if (!validPass) {
      return res.sendStatus(401).json({ message: " Wrong Password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_TOKEN, {
      expiresIn: "24h",
    });
    res.json({ token });
    console.log(token);
  } catch (err) {
    console.log(err);
    res.sendStatus(503);
  }
});
export default router;
