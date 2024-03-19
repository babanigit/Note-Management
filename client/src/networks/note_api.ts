import { NoteModel } from "../model/noteModel";
import { UserModel } from "../model/userModel";

const noteLink = "http://localhost:5002/api/notes/";
const userLink = "http://localhost:5002/api/users/";


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


// get logged in user details
export async function getLoggedInUser():Promise<UserModel>{

    const res= await fetchData(userLink,{method:"GET"});
    return res.json();
}


// get register
export interface RegisterCred {
    userName:string;
    email:string;
    passwd:string;
}
export async function getRegisterUser(Credential:RegisterCred):Promise<UserModel>{

    const res= await fetchData(userLink+"register",{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Credential),
    });
    return res.json();
}

// get login
export interface LoginCred {
    userName:string;
    passwd:string;
}

export async function getLoginUser(Credential:LoginCred):Promise<UserModel>{

    const res= await fetchData(userLink+"login",{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Credential),
    });
    return res.json();
}

// get logout
export async function getLogout(){

    await fetchData(userLink+"logout",{method:"POST"});
}




// fetch notes
export async function fetchNotes(): Promise<NoteModel[]> {
    const res = await fetchData(noteLink, {
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
    const res = await fetchData(noteLink, {
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
    const res = await fetchData(noteLink + noteId, {
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
    await fetchData(noteLink + noteId, { method: "DELETE" });
}


