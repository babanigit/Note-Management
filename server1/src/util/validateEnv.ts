
import { CleanedEnv, cleanEnv } from "envalid";
import { port,str } from "envalid";

export default cleanEnv(process.env,{
    PORT:port(),
    DATABASE:str(),
    ACCESS_TOKEN_SECRET:str(),
})

