import cors from "cors";
import { config } from "dotenv";
import express from "express";
import "express-async-errors";
import { errorHandler } from "./middleware/errorHander";
import { todosRouter } from "./routes";

config();

const serverPort = process.env.SERVER_PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Todos</h1>");
});
app.use("/api/v1/todos", todosRouter);

app.use(errorHandler);

app.listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort}`);
});
