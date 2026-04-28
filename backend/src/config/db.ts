import mongoose from "mongoose";
import env from "./env";

const connectDB = async () => {

 await mongoose.connect(
   env.MONGO_URI
 );

 console.log("Mongo Connected");
};

export default connectDB;