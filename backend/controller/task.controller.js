const Task = require("../model/task.model");
const generateSubtasks = require("../services/ai.services");

const taskCreate = async (req, res) => {

    try{
    const {goal} = req.body;

    const user = req.user.id;

    const subtasks = await generateSubtasks(goal);

    const createdTask = await Task.create({
        goal,
        user,
        subtasks
    })

    return res.status(201).json({
        success:true,
        user:{
            user:createdTask.user,
            goal:createdTask.goal,
            subtasks:createdTask.subtasks
        }
    })
}catch(error) {
    return res.status(400).json({
        success:false,
        massage:error.message
    })
}
}

const startFocus = async (req, res) => {

    try{

    const userId = req.user.id;
    const {taskId} = req.params

    const task = await Task.findOne({
    _id: taskId,
    user: userId
});
    if (!task) {
        return res.status(404).json({
            success:false,
            massage:"acesss denied"
        })
    }

    const activeSession = task.session.some((session) => {
    return !session.endtime;
});

if (activeSession) {
    return res.status(400).json({
        success: false,
        message: "Focus session is already running"
    });
}

    task.session.push({
    starttime: new Date(),
    endtime: null
});

    task.status = "in-progress";

    await task.save();

    return res.status(200).json({
        sucess:true,
        massage:"focus time",
        task:{
            session:task.session,
            status:task.status
        }
    })
}catch(error) {
    return res.status(400).json({
        success:false,
        massage:error.message
    })
}
}

const endFocus = async (req,res) => {
    const userId  = req.user.id
    const {taskId} = req.params

    const task = await Task.findOne({
    _id: taskId,
    user: userId
});
    if(!task) {
        return res.status(404).json({
            success:false,
            massage:"acesss denied"
        })
    }

    if (task.session.length === 0) {
    return res.status(400).json({
        success: false,
        message: "No focus session found"
    });
}



const lastSession = task.session[task.session.length - 1];


    if (lastSession.endtime) {
    return res.status(400).json({
        success: false,
        message: "No active focus session"
    });
}

lastSession.endtime = new Date();

lastSession.duration =
(lastSession.endtime - lastSession.starttime) / 1000;

task.status = "pending"; // ya "completed"

await task.save();

    return res.status(200).json({
        sucess:true,
        massage:"focus time",
        task:{
            session:task.session,
            duration:task.duration,
            status:task.status
        }
    })
}

const subtasksComplete = async (req, res) => {

    const userId = req.user.id
    const{taskId} = req.params
    const{subtaskId} = req.params

    const task = await Task.findOne({
    _id: taskId,
    user: userId
    }) 

    if(!task) {
        return res.status(400).json({
            success:false,
            massage:"access denied"
        })
    }

    console.log("taskId:", taskId);
console.log("subtaskId from URL:", subtaskId);

console.log("All subtasks:");
task.subtasks.forEach((subtask) => {
    console.log(subtask._id.toString(), subtask.title);
});

    const subtask = task.subtasks.id(subtaskId);
    if (!subtask) {
    return res.status(404).json({
        success: false,
        message: "Subtask not found"
    });

}

    subtask.completed = true;

const allCompleted = task.subtasks.every((subtask) => {
    return subtask.completed;
});

if (allCompleted) {
    task.status = "complete";
}

    await task.save();

    return res.status(200).json({
        success:true,
        massage:"subtask completed",
        task:{
            subtask:subtask.completed,
        }
    })

}

const allTask = async (req, res) => {

    try{
    const userId = req.user.id;
    
    const userfind = await Task.find({user:userId})

    if(userfind.length === 0) {
        return res.status(404).json({
            success:false,
            massage:"create a task"
        })
    }

    return res.status(200).json({
        success:true,
        massage:"all of your task",
        userfind
    })
} catch(error) {
    return res.status(400).json({
        success:false,
        massage:error.message
    })
}
}

const getsingleTask = async (req, res) => {
    const userId = req.user.id;
    const {taskId} = req.params



    const task = await Task.findOne({
    _id: taskId,
    user: userId
});

 
console.log(task);
    if(!task) {
        return res.status(400).json({
            success:false,
            massage:"not found any"
        })
    }

    return res.status(200).json({
        success:true,
        massage:"find it",
        task
    })
}

const deleteTask = async (req, res) => {

    try{
    const userId = req.user.id;
    const {taskId} = req.params;

    const task = await Task.findOneAndDelete({user: userId, _id:taskId})

    if(!task) {
        return res.status(404).json({
            success:false,
            massage:"task not found"
        })
    }

    return res.status(200).json({
        success:true,
        massage:"task was deleted"
    })
}catch(error) {
    return res.status(400).json({
        success:false,
        massage:error.message
    })
}
}

const updateTask = async (req,res) => {

    try{
    const userId = req.user.id;
    const {goal} = req.body
    const{taskId} = req.params

    const subtasks = await generateSubtasks(goal);


    const tasks =await Task.findOneAndUpdate( {
        _id: taskId,
        user: userId
    },
    {
        goal: goal,
        subtasks: subtasks
    },
    {
        new: true
    })

    if(!tasks) {
        return res.status(404).json({
            success:false,
            massage:"not found task"
        })
    }

    return res.status(200).json({
        success:true,
        massage:"task updated",
        tasks
    })
}catch(error) {
    return res.status(400).json({
        success:false,
        massage:error.message
    })
}
}

module.exports = {
    taskCreate,
    startFocus,
    endFocus,
    subtasksComplete,
    allTask,
    getsingleTask,
    deleteTask,
    updateTask
}