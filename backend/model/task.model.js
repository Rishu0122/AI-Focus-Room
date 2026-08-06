const mongoose = require("mongoose")
const taskSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "AIUSER",
            required: true
        },

        goal:{
            type:String,
            required:true
        },

        status:{
            type:String,
            enum:["pending","in-progress", "complete"],
            default:"pending"
        },

        subtasks: [
    {
        title: {
            type: String,
            required: true
        },

        completed: {
            type: Boolean,
            default: false
        }
    }
],
    
    session:[
        {
            starttime:{
                type:Date,
            },
            endtime:{
                type:Date,
            },
            duration:{
                type:Number,
                default:0
            },
        }
    ]
    }
)


module.exports = mongoose.model("TASKUSER", taskSchema)
