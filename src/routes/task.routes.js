const express = require("express");
const TaskModel = require("../models/task.model");

const router = express.Router();

//GET: getting inside of tasks route
router.get("/", async (req, res) => {
    try {
        const tasks = await TaskModel.find({});
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//READ: reading inside of tasks route
router.get("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await TaskModel.findById(taskId);
        //If task is not finded, return a 404 error
        if (!task) {
            return res.status(404).send("Essa tarefa não foi encontrada");
        }

        return res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error.message);
    }
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