import { Modal, Form, ModalFooter, Button } from "react-bootstrap";
import { NoteModel } from "../../model/noteModel";
import { useForm } from "react-hook-form";
import { NoteInput } from "../../networks/note_api";

import * as noteApi from "../../networks/note_api";

interface AddNoteprops {
  onDismiss: () => void;
  onNoteSaved: (note: NoteModel) => void;
}

const AddNoteDialog = ({ onDismiss, onNoteSaved }: AddNoteprops) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>();

  async function onSubmit(input: NoteInput) {
    try {
      const noteRes = await noteApi.createNote(input);
      onNoteSaved(noteRes);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <>
      <Modal show onHide={onDismiss}>
        <Modal.Header closeButton>
          <Modal.Title>Add notes</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
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
          <Button type="submit" form="addNoteForm" disabled={isSubmitting}>
            save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddNoteDialog;
