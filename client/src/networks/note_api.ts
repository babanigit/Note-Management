import { NoteModel } from "../model/noteModel";

const link = "http://localhost:5002/api/notes";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const respone = await fetch(input, init);
  if (respone.ok) {
    return respone;
  } else {
    const errorBody = await respone.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}

export async function fetchNotes(): Promise<NoteModel[]> {
  const res = await fetchData(link, {
    method: "GET",
  });
  return await res.json();
}

export interface NoteInput {
  title: string;
  text?: string;
}

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
