import { useForm } from "react-hook-form";
import { UserModel } from "../../model/userModel";
import { RegisterCred } from "../../networks/note_api";

import * as NoteApi from "../../networks/note_api";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInputField from "../form/TextInputField";
import { useState } from "react";

import styleUtils from "../../style/utils.module.css";

import { ConflictError } from "../errors/http-errors";


// import {conflictError} from "../"

interface RegisterModelProps {
    onDismiss: () => void;
    onRegistrationSuccessful: (user: UserModel) => void;
}

const RegisterModel = ({
    onDismiss,
    onRegistrationSuccessful,
}: RegisterModelProps) => {

    const [errorText, setErrorText] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterCred>();

    async function onSubmit(credentials: RegisterCred) {
        try {
            const newUser = await NoteApi.getRegisterUser(credentials);
            console.log(newUser);
            onRegistrationSuccessful(newUser);
        } catch (error) {
            if (error instanceof ConflictError) {
                setErrorText(error.message);
            } else {
                alert(error);
            }
            console.error(error);

            // alert(error);
            // console.log(error);
        }
    }

    return (
        <>
            <Modal show onHide={onDismiss}>
                <Modal.Header closeButton>
                    <Modal.Title>register </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {errorText &&
                    <Alert variant="danger">
                        {errorText}
                    </Alert>
                }
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <TextInputField
                            name="userName"
                            label="userName"
                            type="text"
                            placeholder="userName"
                            register={register}
                            registerOptions={{ required: "Required" }}
                            error={errors.userName}
                        />
                        <TextInputField
                            name="email"
                            label="Email"
                            type="email"
                            placeholder="Email"
                            register={register}
                            registerOptions={{ required: "Required" }}
                            error={errors.email}
                        />
                        <TextInputField
                            name="passwd"
                            label="Passwd"
                            type="passwd"
                            placeholder="Passwd"
                            register={register}
                            registerOptions={{ required: "Required" }}
                            error={errors.passwd}
                        />
                        {/* <TextInputField
                            name="cPassword"
                            label="Password"
                            type="password"
                            placeholder="Password"
                            register={register}
                            registerOptions={{ required: "Required" }}
                            error={errors.passwd}
                        /> */}
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className={styleUtils.width100}
                        >
                            Log In
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default RegisterModel;
