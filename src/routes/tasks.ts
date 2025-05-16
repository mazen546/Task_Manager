import express from "express";
import {
  getAllTasks,
  createTask,
  deleteTask,
  getTask,
  updateTask,
} from "../controllers/tasksController";
const tasksRout = express.Router();
tasksRout.route("/").get(getAllTasks).post(createTask);
tasksRout.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);
export { tasksRout };
