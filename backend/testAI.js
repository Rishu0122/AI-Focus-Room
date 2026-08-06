require("dotenv").config();

const generateSubtasks = require("./services/ai.services");

async function test() {
    const subtasks = await generateSubtasks(
        "Learn React hooks and build a project"
    );

    console.log(subtasks);
}

test();