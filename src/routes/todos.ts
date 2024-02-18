import express from "express";
import { createTodo, getTodos } from "../controller";

const router = express.Router();

router.route("/").get(getTodos).post(createTodo);
export default router;
