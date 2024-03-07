import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "BackendAPI",
    })

    .then(() => console.log("Database connection has been established"))
    .catch((e) => console.log(e));
};
