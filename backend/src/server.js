import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import creatorRoutes from "./routes/creatorRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import followRoutes from "./routes/followRoutes.js";
import commentRoutes from "./routes/commentRoutes.js"
import exploreRoutes from "./routes/exploreRoutes.js"
import deleteAccountRoutes from "./routes/deleteAccountRoutes.js"
import razorpayRoutes from "./routes/razorpayRoutes.js"
import path from "path";

connectDB(); // this is so it can Calls the database connection function to connect your backend to the database before starting the server.

const app = express()

app.use(cors());

app.use(express.json()); //Parses incoming JSON requests into JavaScript objects.
// Without this, req.body would be undefined for JSON requests.

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/creator", creatorRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/comments", commentRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/explore", exploreRoutes);
app.use("/api/deleteaccount", deleteAccountRoutes);
app.use("/api/razorpay", razorpayRoutes);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`)
})
