import * as mongoose from "mongoose";

export const connectDB = async () => {
  if (!process.env.DATABASE_URI) {
    console.error(`URI not defined, could not connect`);
    return;
  }
  try {
    await mongoose.connect(process.env.DATABASE_URI);
  } catch (err) {
    console.log(err);
  }
};
