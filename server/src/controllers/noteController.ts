import express,{ Express,NextFunction,Request,Response } from "express";

import NoteModel from "../models/noteSchema"
import createHttpError from "http-errors";
import mongoose from "mongoose";

interface CreateNoteBody{
  title?:string;
  text?:string;
}

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

    const noteId= req.params.noteId;
    try {

      if(!mongoose.isValidObjectId(noteId)) throw createHttpError(400,"invalid note id")

      const newNotes=await NoteModel.findById(noteId).exec();
      if (!newNotes) throw createHttpError(404,"note not found");

      res.status(201).json(newNotes)
    } catch (error) {
        next(error)
    }
  }

 

  export const createNotes =  async(req: Request, res: Response, next:NextFunction) => {

    const {title,text}:CreateNoteBody = req.body ;
    try {
      if(!title) throw createHttpError(400,"note must have a title")
      const newNotes=await NoteModel.create({
        title,
        text,
      })
      res.status(201).json(newNotes)
    } catch (error) {
        next(error)
    }
  }


