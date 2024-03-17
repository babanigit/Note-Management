import styles from "../../style/note.module.css"


import React from 'react'
import { NoteModel } from '../../model/noteModel'
import { Card } from 'react-bootstrap';
import { FormatDate } from "../../util/FormateData";

interface NoteProps{
    note:NoteModel;
    className?:string;
}
const Note = ({ note ,className}:NoteProps) => {

    const{
        _id,
        title,
        text,
        createdAt,
        updatedAt
    }= note;
    
    let createdUpdatedText:string;

    if(updatedAt>createdAt) {
        createdUpdatedText="updated: " + FormatDate(updatedAt);
    }else{
        createdUpdatedText="created: " +FormatDate(createdAt);
    }

  return (
    <>
    <Card className={`${styles.noteCard} ${className}`}>
        <Card.Body className={` ${styles.cardBody}`}>
            <Card.Title className=' bg-red-200 rounded-md '>
                {title}
            </Card.Title>
            <Card.Text className={styles.cardText} > 
                {text}
            </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
            {createdUpdatedText}
        </Card.Footer>
    </Card>
    </>
    )
}

export default Note