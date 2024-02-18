import express from "express";
import { fromZodError } from "zod-validation-error";
import pool from "../db";
import { BadRequestError } from "../errors";
import { TaskSchema } from "../schema";

export const createTodo = async (
  req: express.Request,
  res: express.Response
) => {
  const checkBody = TaskSchema.pick({
    title: true,
    description: true,
    priority: true,
    status: true,
    due_date: true,
  }).safeParse(req.body);

  if (!checkBody.success) {
    throw new BadRequestError(fromZodError(checkBody.error).message);
  }

  const {
    title,
    description,
    due_date = new Date(),
    priority = "low",
    status = "todo",
  } = checkBody.data;
  const client = await pool.connect();
  try {
    const newTodo = await client.query(
      "INSERT INTO tasks (title, description, status, priority, due_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, description, status, priority, due_date]
    );
    res.json(newTodo.rows);
  } catch (error) {
    throw new Error();
  } finally {
    client.release();
  }
};

export const getTodos = async (req: express.Request, res: express.Response) => {
  const client = await pool.connect();
  try {
    const allTodos = await client.query("SELECT * FROM tasks");
    res.json(allTodos.rows);
  } catch (error) {
    res.json({ error: error });
  } finally {
    client.release();
  }
};
