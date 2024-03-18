import { NoteModel } from "../model/noteModel";

const link = "http://localhost:5002/api/notes/";

// we used this to handle the errors while fetching the data from api
async function fetchData(input: RequestInfo, init?: RequestInit) {
    const res = await fetch(input, init);
    if (res.ok) {
        return res;
    } else {
        // errorBody > errorMessage > throw Error.
        const errorBody = await res.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
}

// fetch notes
export async function fetchNotes(): Promise<NoteModel[]> {
    const res = await fetchData(link, {
        method: "GET",
    });
    return await res.json();
}

export interface NoteInput {
    // title: string;
    // text?: string;

    _id:string;
    title:string;
    text?:string;
    createdAt:string;
    updatedAt:string;
}

// to create note
export async function createNote(note: NoteInput): Promise<NoteModel> {
    const res = await fetchData(link, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
    });
    return res.json();
}

// update notes
export async function updateNote(
    noteId: string,
    note: NoteInput
): Promise<NoteInput> {
    const res = await fetchData(link + noteId, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
    });

    return res.json();
}

// delete note
export async function deleteNote(noteId: string) {
    await fetchData(link + noteId, { method: "DELETE" });
}
