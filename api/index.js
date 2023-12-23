import Express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
dotenv.config();
//password:sangramr343,databasename:mern-auth
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));
const app = Express();
app.use(Express.json());

app.listen(3000, () => console.log("server started on port 3000 !"));

// app.get("/", (req, res) => {
//   res.json({ message: "API is working fine " });
// });
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// Error Handling
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});
