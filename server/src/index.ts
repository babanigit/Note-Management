
import app from "./app";
import connectDb from "./db/connection";
// import utilEnv from "./util/validateEnv";


const port = process.env.PORT //5002

connectDb();




app.listen(port, () => {
  console.log(
    `[server]: hello, my Server is running at http://localhost:${port}`
  );
});
