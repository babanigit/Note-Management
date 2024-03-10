// const mongoose = require("mongoose");

// const connectDb = async () => {
//   try {
//     const DB = process.env.DATABASE;

//     if (!DB) {
//       throw new Error("Database connection string is not provided.");
//     }

//     const connect = await mongoose.connect(DB);
//     console.log(
//       "database connected: ",
//       connect.connection.host,
//       connect.connection.name
//     );
//   } catch (error) {
//     console.error("failed to connect to the database");
//     console.error(error);
//     process.exit(1);
//   }
// };

// module.exports = connectDb;

// THIS IS CONNECTION TO THE MONGODB 
const mongoose = require("mongoose");


// we hided this link in config.env
const DB =process.env.DATABASE


// MAIN CONNECTION TO THE MONGODB
mongoose
  .connect(DB)
  .then(() => {
    console.log("connection successful to the mongodb database.... :)");
  })
  .catch(() => {
    console.log("not connected to the mongog db database :(");
  });

