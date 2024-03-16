import express,{Express} from "express";


import {
    getNotes
} from "../controllers/noteController"

const router=express.Router()


router.route("/").get(getNotes);


export default router;