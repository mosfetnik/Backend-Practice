import express from "express";
import db from "../db.js";
const router = express.Router();

router.get("/", (req, res) => {
  const getTodos = db.prepare(`SELECT * FROM todos WHERE user_id = ? `);
  const todos = getTodos.all(req.userId);
  res.json(todos);
});

router.post("/", (req, res) => {
  const { task } = req.body;
  const insertTodo = db.prepare(`INSERT INTO todos(
      user_id,task) VALUES(?, ?)`);
  const result = insertTodo.run(req.userId, task);
  res.json({ id: result.lastInsertRowid, task, completed: 0 });
});

router.put("/:id", (req, res) => {
  const { completed } = req.body;
  const { id } = req.params;
  const { page } = req.query;

  const updatedToDo = db.prepare(
    ` UPDATE todos SET COMPLETED = ? WHERE id =? `
  );
  updatedToDo.run(completed, id);
  res.json({ message: " To Do Completed" });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const  userId = req.userId
  const deleteToDo = db.prepare(`DELETE FROM todos WHERE id = ? AND user_id = ?`);
  deleteToDo.run(id,userId);
  res.json({ mwssage: "To Do Deleted" });
});

export default router;
