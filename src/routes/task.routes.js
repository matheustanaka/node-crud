const express = require("express");
const TaskController = require("../controllers/task.controller");
const TaskModel = require("../models/task.model");

const router = express.Router();

//GET: getting inside of tasks route
router.get("/", async (req, res) => {
    return new TaskController(req, res).getAll();
});

//READ: reading inside of tasks route
router.get("/:id", async (req, res) => {
    return new TaskController(req, res).getTasksById();
});

//POST: posting inside of tasks route
router.post("/", async (req, res) => {
    return new TaskController(req, res).create();
});

//UPDATE: updating inside of tasks route
router.patch("/:id", async (req, res) => {
    return new TaskController(req, res).update();
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
