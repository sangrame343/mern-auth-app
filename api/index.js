import Express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
//password:sangramr343,databasename:mern-auth
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));
const app = Express();

app.listen(3000, () => console.log("server started on port 3000 !"));
