import express, { Express, NextFunction, Request, Response, } from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./Routes/userRoutes";

import NoteModel from "./models/noteSchema"
import { error } from "console";


dotenv.config({path:"./.env"});
const app: Express = express();

app.use(express.json());
app.use(cors());



// app.use(userRoutes);  


app.get("/hii", async(res:Response,req:Request)=> {
    const notes= await NoteModel.find().exec();
    res.status(200).json(notes)
})

app.use((res,req,next)=>{
    next(Error("endpoint not found"))
})

app.use(( error:unknown, req:Request, res:Response, next:NextFunction)=> {
    console.error(error)
    let errorMessage="an unknown error occurred"
    if(error instanceof Error)errorMessage= error.message;
    res.status(500).json({error:errorMessage})
})


export default app;