const TaskModel = require("../models/task.model");

class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async getTasks() {
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

    async postTasks() {
        try {
            const newTask = new TaskModel(this.req.body);

            await newTask.save();

            this.res.status(201).send(newTask);
        } catch (error) {
            this.res.send(500).send(error.message);
        }
    }
}

module.exports = TaskController;
