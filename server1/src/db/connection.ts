import mongoose from "mongoose";
import utilEnv from "../util/validateEnv";

const connectDb = async ():Promise<void> => {
  try {
    // const DB: string | undefined = process.env.DATABASE;

    const DB: string | undefined = process.env.DATABASE;

    if (!DB) {
      throw new Error("Database connection string is not provided.");
    }

    const connect = await mongoose.connect(DB);
    console.log(
      "database connected: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.error("failed to connect to the database");
    console.error(error);
    process.exit(1);
  }
};
export default connectDb;
