"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotes = exports.getNote = exports.getNotes = void 0;
const noteSchema_1 = __importDefault(require("../models/noteSchema"));
const getNotes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // throw Error("Bazinga!");
        const notes = yield noteSchema_1.default.find().exec();
        res.status(200).json(notes);
    }
    catch (error) {
        next(error);
    }
});
exports.getNotes = getNotes;
const getNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const title=req.body.title;
    // const text=req.body.text;
    const noteId = req.params.noteId;
    const { title, text } = req.body;
    try {
        const newNotes = yield noteSchema_1.default.findById(noteId).exec();
        res.status(201).json(newNotes);
    }
    catch (error) {
        next(error);
    }
});
exports.getNote = getNote;
const createNotes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const title=req.body.title;
    // const text=req.body.text;
    const { title, text } = req.body;
    try {
        const newNotes = yield noteSchema_1.default.create({
            title,
            text,
        });
        res.status(201).json(newNotes);
    }
    catch (error) {
        next(error);
    }
});
exports.createNotes = createNotes;
