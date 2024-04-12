// app.js
import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import {
  addTasks,
  allTasks,
  deleteTask,
  readTask,
  updateTask,
} from "./controllers.js";
import getTask from "./middlewares.js";

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get("/tasks", allTasks);

app.post("/tasks", addTasks);

app.get("/tasks/:id", readTask);

app.patch("/tasks/:id", updateTask);

app.delete("/tasks/:id", deleteTask);

// Start Server
app.listen(PORT);
