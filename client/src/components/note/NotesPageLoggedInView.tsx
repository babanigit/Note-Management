import { Button, Col, Row, Spinner } from "react-bootstrap";
import sytleUtil from "../../style/utils.module.css";

import { FaPlus } from "react-icons/fa";
import AddEditNoteDialog from "../../components/noteDialog/AddEditNoteDialog";

import { useEffect, useState } from "react";
import { NoteModel } from "../../model/noteModel";

import * as NotesApi from "../../networks/note_api";


import styles from "../../style/notePage.module.css";
import Note from "./Note";




const NotesPageLoggedInView = () => {

    const [notes, setNote] = useState<NoteModel[]>([]);
    const [showNotesLoading, setShowNotesLoading] = useState(true);
    const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);
  
    const [showAddNote, setShowAddNote] = useState(false);
    const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);


    useEffect(() => {
        async function loadNotes() {
          try {
    
            setShowNotesLoadingError(false);
            setShowNotesLoading(true)
    
            const notes = await NotesApi.fetchNotes();
            setNote(notes);
    
          } catch (error) {
            console.error(error);
            alert(error);
            setShowNotesLoadingError(true);
    
          } finally {
            setShowNotesLoading(false)
    
          }
        }
    
        loadNotes();
      }, []);
    

      // to delete note
      async function deleteNote(note: NoteModel) {
        try {
    
          await NotesApi.deleteNote(note._id)
          setNote(notes.filter(existingNote => existingNote._id !== note._id))
        } catch (error) {
          console.error(error);
          alert(error)
        }
      }
    

      // noteGrids
      // here will map the note
      const notesGrid =
        <Row xs={1} md={2} xl={3}
          className={`g-4 ${styles.notesGrid} `}
        >
          {notes.map((note) => (
            <Col className=" p-2" key={note._id}>
              <Note
                note={note}
                className={styles.note}
                onNoteClicked={setNoteToEdit}
                onDeleteNoteClicked={deleteNote}
              />
            </Col>
          ))}
        </Row>

    return (
        <>

            <Button onClick={() => setShowAddNote(true)}
                className={` bg-blue-400 ${sytleUtil.blockCenter} ${sytleUtil.flexCenter} `} >
                <FaPlus />
                Add new notes
            </Button>

            {showNotesLoading && <Spinner animation="border" variant="primary" />}
            {showNotesLoadingError && <p> something went wrong please refresh the page.</p>}



{/* here will show all the notes through the map */}
            {!showNotesLoading && 
            !showNotesLoadingError &&
                <>
                    {
                        notes.length > 0
                            ? notesGrid
                            : <p>you don't have any notes yet</p>
                    }
                </>
            }


{/* to add note  */}
            {
                showAddNote &&
                <AddEditNoteDialog
                    onDismiss={() => setShowAddNote(false)}
                    onNoteSaved={(newNote) => {
                        setNote([...notes, newNote])
                        setShowAddNote(false)
                    }}
                />
            }


{/* to edit note */}
            {noteToEdit &&
                <AddEditNoteDialog
                    noteToEdit={noteToEdit}
                    onDismiss={() => setNoteToEdit(null)}
                    onNoteSaved={(updatedNote) => {
                        setNote(notes.map(existingNote => existingNote._id === updatedNote._id ? updatedNote : existingNote))
                        setNoteToEdit(null)
                    }}
                />
            }

        </>
    )
}

export default NotesPageLoggedInView