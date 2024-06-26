require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { connectToDb } = require("./Db/connection");
const app = express();
const path=require("path");
connectToDb();
//
const userRouter = require("./Router/users.routes");
const blogRouter = require("./Router/blog.routes");

// middleware
app.use(cors({
  exposedHeaders:"X-TOTAL-COUNT",
  origin:true,
  credentials:true
}));
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: "keyboard cat", cookie: { maxAge: 60000 } }));
//
app.use("/api", userRouter.router);
app.use("/api", blogRouter.router);
// 
app.use(express.static(path.join(__dirname,  "build")));
app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`App is Running on Port:http://localhost:${process.env.PORT}`);
});
