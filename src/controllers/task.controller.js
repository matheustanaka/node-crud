const TaskModel = require("../models/task.model");

class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async getAll() {
        try {
            const tasks = await TaskModel.find({});
            this.res.status(200).send(tasks);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async getTasksById() {
        try {
            const taskId = this.req.params.id;
            const task = await TaskModel.findById(taskId);
            //If task is not finded, return a 404 error
            if (!task) {
                return this.res
                    .status(404)
                    .send("Essa tarefa não foi encontrada");
            }
            return this.res.status(200).send(task);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async create() {
        try {
            const newTask = new TaskModel(this.req.body);

            await newTask.save();

            this.res.status(201).send(newTask);
        } catch (error) {
            this.res.send(500).send(error.message);
        }
    }

    async update() {
        try {
            const taskId = this.req.params.id;
            const taskData = this.req.body;

            const taskToUpdate = await TaskModel.findById(taskId);

            const allowedUpdates = ["description", "isCompleted"];

            const resquetedUpdates = Object.keys(this.req.body);

            for (const update of resquetedUpdates) {
                if (allowedUpdates.includes(update)) {
                    taskToUpdate[update] = taskData[update];
                } else {
                    return this.res
                        .status(500)
                        .send("One or more tasks is not chageables");
                }
            }

            await taskToUpdate.save();

            return this.res.status(200).send(taskToUpdate);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async delete() {
        try {
            const taskId = this.req.params.id;

            const taskToDelete = await TaskModel.findById(taskId);

            if (!taskToDelete) {
                this.res.status(500).send("Essa tarefa nao foi encontrada");
            }

            const deletedTask = await TaskModel.findByIdAndDelete(taskId);

            this.res.status(200).send(deletedTask);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }
}

module.exports = TaskController;