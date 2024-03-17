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
exports.deleteNote = exports.updateNote = exports.createNotes = exports.getNote = exports.getNotes = void 0;
const noteSchema_1 = __importDefault(require("../models/noteSchema"));
const http_errors_1 = __importDefault(require("http-errors"));
const mongoose_1 = __importDefault(require("mongoose"));
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
    const noteId = req.params.noteId;
    try {
        if (!mongoose_1.default.isValidObjectId(noteId))
            throw (0, http_errors_1.default)(400, "invalid note id");
        const newNotes = yield noteSchema_1.default.findById(noteId).exec();
        if (!newNotes)
            throw (0, http_errors_1.default)(404, "note not found");
        res.status(201).json(newNotes);
    }
    catch (error) {
        next(error);
    }
});
exports.getNote = getNote;
const createNotes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, text } = req.body;
    try {
        if (!title)
            throw (0, http_errors_1.default)(400, "note must have a title");
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
const updateNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const noteId = req.params.noteId;
    const newTitle = req.body.title;
    const newText = req.body.text;
    try {
        if (!mongoose_1.default.isValidObjectId(noteId))
            throw (0, http_errors_1.default)(400, "invalid note id");
        if (!newTitle)
            throw (0, http_errors_1.default)(400, "note must have a title");
        const note = yield noteSchema_1.default.findById(noteId).exec();
        if (!note)
            throw (0, http_errors_1.default)(404, "note not found");
        note.title = newTitle;
        note.text = newText;
        const updateNote = yield note.save();
        res.status(201).json(updateNote);
    }
    catch (error) {
        next(error);
    }
});
exports.updateNote = updateNote;
const deleteNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const noteId = req.params.noteId;
    try {
        if (!mongoose_1.default.isValidObjectId(noteId))
            throw (0, http_errors_1.default)(400, "invalid note id");
        const note = yield noteSchema_1.default.findById(noteId).exec();
        if (!note)
            throw (0, http_errors_1.default)(404, "note not found");
        yield note.deleteOne({ _id: noteId });
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteNote = deleteNote;
