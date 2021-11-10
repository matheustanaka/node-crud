const express = require("express");
const TaskController = require("../controllers/task.controller");
const TaskModel = require("../models/task.model");

const router = express.Router();

//GET: getting inside of tasks route
router.get("/", async (req, res) => {
    return new TaskController(req, res).getTasks();
});

//READ: reading inside of tasks route
router.get("/:id", async (req, res) => {
    return new TaskController(req, res).getTasksById();
});

//POST: posting inside of tasks route
router.post("/", async (req, res) => {
    try {
        const newTask = new TaskModel(req.body);

        await newTask.save();

        res.status(201).send(newTask);
    } catch (error) {
        res.send(500).send(error.message);
    }
});

//UPDATE: updating inside of tasks route
router.patch("/", async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskData = req.body;

        const taskToUpdate = await TaskModel.findById(taskId);

        const allowedUpdates = ["description", "isCompleted"];

        const resquetedUpdates = Object.keys(req.body);

        for (update of resquetedUpdates) {
            if (allowedUpdates.includes(update)) {
                taskToUpdate[update] = taskData[update];
            } else {
                return res
                    .status(500)
                    .send("One or more tasks is not chageables");
            }
        }

        await taskToUpdate.save();

        return res.status(200).send(taskToUpdate);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//DELETE: deleting inside of tasks route
router.delete("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;

        const taskToDelete = await TaskModel.findById(taskId);

        if (!taskToDelete) {
            res.status(500).send("Essa tarefa nao foi encontrada");
        }

        const deletedTask = await TaskModel.findByIdAndDelete(taskId);

        res.status(200).send(deletedTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
