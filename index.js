const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
const TaskRouter = require("./src/routes/task.routes")

const connectToDatabase = require("./src/database/mongoose.database");
const TaskModel = require("./src/models/task.model");

dotenv.config();
const app = express();
//using cors
app.use(cors());
app.use(express.json());
connectToDatabase();

app.use("/tasks", TaskRouter);

app.listen(8000, () => console.log("Listening on port 8000"));
