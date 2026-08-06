const express = require("express");
const router = express.Router();

const {taskCreate, startFocus, endFocus, subtasksComplete, allTask, getsingleTask,deleteTask, updateTask} = require("../controller/task.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/createTask", authMiddleware,taskCreate);
router.get("/",authMiddleware,allTask)
router.post("/:taskId/start", authMiddleware, startFocus);
router.post("/:taskId/end",authMiddleware,endFocus);
router.post("/:taskId/subtasks/:subtaskId",authMiddleware,subtasksComplete)
router.post("/:taskId/findTask", authMiddleware, getsingleTask)
router.delete("/:taskId/deleteTask",authMiddleware,deleteTask)
router.put("/:taskId/updateTask", authMiddleware,updateTask)


module.exports = router