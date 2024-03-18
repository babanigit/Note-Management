import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { NoteModel } from "../../model/noteModel";
import Note from "../../components/note/Note";
import { Button, Col, Container, Row } from "react-bootstrap";

import * as NotesApi from "../../networks/note_api"

import styles from "../../style/notePage.module.css"
import AddNoteDialog from "../../components/noteDialog/AddNoteDialog";

const Home = () => {
  const [note, setNote] = useState<NoteModel[]>([]);

  const [showAddNote,setShowAddNote]= useState(false);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes=await NotesApi.fetchNotes();
        setNote(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }

    loadNotes();
  }, []);

  return (
    <>
      <Container className=" bg-blue-100">

        <Button onClick={()=> setShowAddNote(true)} >
          Add new notes
        </Button>

        <Row xs={1} md={2} xl={3}>
          {note.map((note) => (
            <Col className=" p-2" key={note._id}>
              <Note note={note} className={styles.note}  />
            </Col>
          ))}
        </Row>
        {
          showAddNote &&
          <AddNoteDialog
          onDismiss={()=>setShowAddNote(false)}
          onNoteSaved={()=>{}}
          />
        }
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
