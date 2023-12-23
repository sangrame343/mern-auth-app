import Express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
dotenv.config();
//password:sangramr343,databasename:mern-auth
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));
const app = Express();

app.listen(3000, () => console.log("server started on port 3000 !"));

// app.get("/", (req, res) => {
//   res.json({ message: "API is working fine " });
// });
app.use("/api/user", userRoutes);
