import express,{ Express,NextFunction,Request,Response } from "express";

import NoteModel from "../models/noteSchema"


export const getNotes =  async(req: Request, res: Response, next:NextFunction) => {

    try {
        // throw Error("Bazinga!");
        const notes= await NoteModel.find().exec();
        res.status(200).json(notes);
    } catch (error) {
        next(error)
    }

  }

  export const getNote =  async(req: Request, res: Response, next:NextFunction) => {

    // const title=req.body.title;
    // const text=req.body.text;
    const noteId= req.params.noteId;
    const {title,text} = req.body ;
    try {
      const newNotes=await NoteModel.findById(noteId).exec();
      res.status(201).json(newNotes)
    } catch (error) {
        next(error)
    }
  }

  export const createNotes =  async(req: Request, res: Response, next:NextFunction) => {

    // const title=req.body.title;
    // const text=req.body.text;
    const {title,text} = req.body ;
    try {
      const newNotes=await NoteModel.create({
        title,
        text,
      })
      res.status(201).json(newNotes)
    } catch (error) {
        next(error)
    }
  }


