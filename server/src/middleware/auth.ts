import { RequestHandler } from "express";
import createHttpError from "http-errors";

export const requiresAuth:RequestHandler=(req,res,next) =>{
    if (req.session.userId) {
        next();
    }else {
        console.log("error from auth")
        next(createHttpError(401,"user is not authenticated from the auth"))
    }
}