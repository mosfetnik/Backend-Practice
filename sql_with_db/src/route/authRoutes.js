import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  // encrypt the password
  const hashedPass = bcrypt.hashSync(password, 8);
  console.log(hashedPass);

  // saving new user and hashed password
  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPass,
      },
    });
    const defaultTodo = `Hello :) Add your first ToDo!`;
    await prisma.todo.create({
      data: {
        task: defaultTodo,
        userId: user.id,
      },
    });

    // Create a token

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

// ^ ===========================================================

// ! we get their email, and we look up the password associated with that email in the database

// but when we get it back and see it's encrypted, which means that we cannot compare it to the one the user just tring to logoin

// so what we can to do ,is agin one way encryption the password the user just entered

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
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
