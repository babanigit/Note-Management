import { Modal, Form, ModalFooter, Button } from "react-bootstrap";
import { NoteModel } from "../../model/noteModel";
import { useForm } from "react-hook-form";
import { NoteInput } from "../../networks/note_api";

import * as noteApi from "../../networks/note_api";

interface AddEditNoteProps {
  noteToEdit?: NoteModel;
  onDismiss: () => void;
  onNoteSaved: (note: NoteModel) => void;
}

const AddEditNoteDialog = ({
  noteToEdit,
  onDismiss,
  onNoteSaved,
}: AddEditNoteProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || "",
      text: noteToEdit?.text || "",
    },
  });

  async function onSubmit(input: NoteInput) {
    try {
      let noteResponse: NoteModel;

      if (noteToEdit) {
        noteResponse = await noteApi.updateNote(noteToEdit._id, input);
      } else {
        noteResponse = await noteApi.createNote(input);
      }

      // const noteRes = await noteApi.createNote(input);
      onNoteSaved(noteResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <>
      <Modal show onHide={onDismiss}>
        <Modal.Header closeButton>
          <Modal.Title>{noteToEdit ? "edit note" : "add note"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                isInvalid={!!errors.title}
                {...register("title", { required: "Required" })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-r">
              <Form.Label>Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Text"
                {...register("text")}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" form="addEditNoteForm" disabled={isSubmitting}>
            save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddEditNoteDialog;
