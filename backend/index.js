require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db")
const routerUse = require("./router/route")
const taskRouteruse = require("./router/task.routes")
const app = express();
const cors = require("cors");

app.use(cors({
    origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://cosmic-arithmetic-005c3b.netlify.app",
    ],
    credentials: true,
}));
require("dotenv").config();
app.use(express.json());

connectDB()
app.use("/api/users",routerUse);
app.use("/api/tasks",taskRouteruse);

app.get("/", (req, res) => {

    res.send("the ap is start")

})
app.listen("3000", console.log("its running"));
