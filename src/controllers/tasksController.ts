import { Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import Task from "../model/Task";

const getAllTasks = async (req: Request, res: Response) => {
  const tasks = await Task.find();
  if (!tasks) {
    res.status(201).json({ message: "No Employees Found." });
    return;
  }
  res.json(tasks);
};

const createTask = async (req: Request, res: Response) => {
  console.log(req.body);
  if (!req.body?.name) {
    res.status(400).json({ message: "Task name is required." });
    return;
  }

  try {
    const result = await Task.create({
      name: req.body.name,
      completed: false,
    });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};
const getTask = async (req: Request, res: Response) => {
  if (!req.params.id) {
    res.status(400).json({ message: "Task ID required" });
    return;
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Invalid Task ID" });
    return;
  }
  const task = await Task.findById({ _id: req.params.id }).exec();
  if (!task) {
    res
      .status(400)
      .json({ message: `No Task matches the ID ${req.params.id}` });
    return;
  }
  res.json(task);
};
const updateTask = async (req: Request, res: Response) => {
  // console.log(req.body);
  if (!req.body.id) {
    res.status(400).json({ message: `Task ID is required` });
    return;
  }
  if (!mongoose.Types.ObjectId.isValid(req.body.id)) {
    res.status(400).json({ message: "Invalid Task ID" });
    return;
  }
  const task = await Task.findById({ _id: req.body.id }).exec();
  if (!task) {
    res
      .status(400)
      .json({ message: `No Task matches the ID ${req.params.id}` });
    return;
  }
  if (req.body.name) task.name = req.body.name;
  task.completed = req.body.completed ?? task.completed;
  const result = await task.save();
  res.json(result);
};
const deleteTask = async (req: Request, res: Response) => {
  if (!req.body.id) {
    res.status(400).json({ message: `Task ID is required` });
    return;
  }
  if (!mongoose.Types.ObjectId.isValid(req.body.id)) {
    res.status(400).json({ message: "Invalid Task ID" });
    return;
  }
  const task = await Task.findById({ _id: req.body.id }).exec();
  if (!task) {
    res.status(400).json({ message: `No Task matches the ID ${req.body.id}` });
    return;
  }
  const result = await task.deleteOne({ _id: req.body.id });
  res.json(result);
};

export { getAllTasks, getTask, createTask, updateTask, deleteTask };
