

import React from 'react'
import { NoteModel } from '../../model/noteModel'
import { Card } from 'react-bootstrap';

interface NoteProps{
    note:NoteModel;
}
const Note = ({ note }:NoteProps) => {

    const{
        _id,
        title,
        text,
        createdAt,
        updatedAt
    }= note;

  return (
    <>
    <Card className=' grid'>
        <Card.Body className=' bg-yellow-100 grid rounded-lg '>
            <Card.Title className=' bg-red-200 rounded-md'>
                {title}
            </Card.Title>
            <Card.Text> 
                {text}
            </Card.Text>
        </Card.Body>
    </Card>
    </>
    )
}

export default Note