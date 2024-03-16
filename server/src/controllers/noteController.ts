import express,{ Express,NextFunction,Request,Response } from "express";

import NoteModel from "../models/noteSchema"


export const getNotes =  async(req: Request, res: Response, next:NextFunction) => {

    try {
        console.log("in api")
        // throw Error("Bazinga!");
        const notes= await NoteModel.find().exec();
        res.status(200).json(notes);
    } catch (error) {
        next(error)
    }

  }


