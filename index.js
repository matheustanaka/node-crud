const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const TaskRouter = require("./src/routes/task.routes")

const connectToDatabase = require("./src/database/mongoose.database");

dotenv.config();

const app = express();
//using cors
app.use(cors());
app.use(express.json());
connectToDatabase();

app.use("/tasks", TaskRouter);

const port = process.env.PORT || 8000;
console.log(process.env.PORT);

app.listen(port, () => console.log(`Listening on port ${port}`));
