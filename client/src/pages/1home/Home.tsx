import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { NoteModel } from "../../model/noteModel";
import Note from "../../components/note/Note";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";

import * as NotesApi from "../../networks/note_api"

import styles from "../../style/notePage.module.css"
import sytleUtil from "../../style/utils.module.css"

import AddEditNoteDialog from "../../components/noteDialog/AddEditNoteDialog";

import {FaPlus} from "react-icons/fa"


const Home = () => {

  const [notes, setNote] = useState<NoteModel[]>([]);
  const [showNotesLoading,setShowNotesLoading] = useState(true);
  const [showNotesLoadingError,setShowNotesLoadingError] = useState(false);
  
  const [showAddNote,setShowAddNote]= useState(false);
  const [noteToEdit,setNoteToEdit] = useState<NoteModel|null>(null);

  useEffect(() => {
    async function loadNotes() {
      try {

        // it will return the fetched data

        setShowNotesLoadingError(false);
        setShowNotesLoading(true)
      
        const notes=await NotesApi.fetchNotes();
        setNote(notes);

      } catch (error) {
        console.error(error);
        alert(error);
        setShowNotesLoadingError(true);

      }finally{
        setShowNotesLoading(false)

      }
    }

    loadNotes();
  }, []);

  async function deleteNote(note:NoteModel) {
    try {
      
      await NotesApi.deleteNote(note._id)
      setNote(notes.filter(existingNote=> existingNote._id !== note._id))
    } catch (error) {
      console.error(error);
      alert(error)
    }
  }

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
      <Container className= {` bg-blue-100 ${styles.notesPage} `}>

        <Button onClick={()=> setShowAddNote(true)}
        className={` bg-blue-400 ${sytleUtil.blockCenter} ${sytleUtil.flexCenter} `} >
          <FaPlus />
          Add new notes
        </Button>

      {showNotesLoading && <Spinner animation="border" variant="primary" />}
      {showNotesLoadingError && <p> something went wrong please refresh the page.</p>}
      {!showNotesLoading && !showNotesLoadingError &&
      <>
      {
        notes.length>0
        ? notesGrid
        : <p>you don't have any notes yet</p>
      }
      </>
      }

        {
          showAddNote &&
          <AddEditNoteDialog
          onDismiss={()=>setShowAddNote(false)}
          onNoteSaved={(newNote)=>{
            setNote([...notes, newNote])
            setShowAddNote(false)
          }}
          />
        }

        {noteToEdit && 
        <AddEditNoteDialog
        noteToEdit={noteToEdit}
        onDismiss={()=> setNoteToEdit(null)}
        onNoteSaved={(updatedNote)=>{
          setNote(notes.map(existingNote => existingNote._id === updatedNote._id ? updatedNote : existingNote))
          setNoteToEdit(null)
        }}
        />}
      </Container>

      {/* <div className=" h-screen grid place-items-center place-content-center ">
        <div>hello</div>
        <button
          className=" border-2 rounded-md border-black p-2 bg-red-100"
          onClick={change}
        >
          {" "}
          <NavLink to={"/register"}>logout</NavLink>{" "}
        </button>
      </div> */}
    </>
  );
};

export default Home;
