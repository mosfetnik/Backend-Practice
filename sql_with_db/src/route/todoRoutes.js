import express from "express";
import prisma from "../prismaClient.js";
const router = express.Router();

// ! ---------------------------- GET------------------
router.get("/", async (req, res) => {
  const todos = await prisma.todo.findMany({
    where: {
      userId: req.userId,
    },
  });
  res.json(todos);
});
// !------------------------------POST------------------
router.post("/", async (req, res) => {
  const { task } = req.body;
  const todo = await prisma.todo.create({
    data: {
      task,
      userId: req.userId,
    },
  });
  res.json(todo);
});
// !------------------------------PUT------------------
router.put("/:id", async (req, res) => {
  const { completed } = req.body;
  const { id } = req.params;
  const { page } = req.query;

  const updateTodo = await prisma.todo.update({
    where: {
      id: parseInt(id),
      userId: req.userId,
    },
    data: {
      completed: !!completed,
    },
  });
  res.json(updateTodo);
});
// !------------------------------DELETE------------------
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  const deleteTodo = await prisma.todo.delete({
    where: {
      id: parseInt(id),
      userId,
    },
  });
  res.json(deleteTodo);
});

export default router;
