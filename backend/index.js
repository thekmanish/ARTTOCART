import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
import authRoute from "./route/authRoute.js"; 
import productRoute from "./route/productRoute.js";
import { mongo } from "mongoose";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);

async function server() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DATABASEE CONNECTION SUCCESSFUL");
    app.listen(process.env.PORT || 3000, () => {
      console.log(`SERVER IS LISTENING AT PORT ${process.env.PORT || 3000}`);
    });
  } catch (error) {
    console.log("INTERNAL SERVER ERROR PLEASE TRY AGAIN", error);
  }
}

server();
