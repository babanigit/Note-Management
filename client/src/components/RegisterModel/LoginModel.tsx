import { useForm } from "react-hook-form";
import { UserModel } from "../../model/userModel";
import { RegisterCred } from "../../networks/note_api";

import * as NoteApi from "../../networks/note_api"
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInputField from "../form/TextInputField";
import { useState } from "react";

import styleUtils from "../../style/utils.module.css"

import { ConflictError } from "../errors/http-errors";

// import {conflictError} from "../"



interface RegisterModelProps {
    onDismiss: () => void;
    onLoginSuccessful: (user: UserModel) => void;
}

const LoginModel = ({ onDismiss, onLoginSuccessful }: RegisterModelProps) => {

    const [errorText, setErrorText] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterCred>();

    async function onSubmit(credentials: RegisterCred) {
        try {
            const newUser = await NoteApi.getLoginUser(credentials);
            onLoginSuccessful(newUser!);
        } catch (error) {

            if (error instanceof ConflictError) {
                setErrorText(error.message);
            } else {
                alert(error);
            }
            console.error(error);

            // alert(error)
            // console.log(error);
        }
    }

    return (
        <>


            <Modal show onHide={onDismiss}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Login
                    </Modal.Title>
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
                            label="Username"
                            type="text"
                            placeholder="Username"
                            register={register}
                            registerOptions={{ required: "Required" }}
                            error={errors.userName}
                        />
                        <TextInputField
                            name="password"
                            label="Password"
                            type="password"
                            placeholder="Password"
                            register={register}
                            registerOptions={{ required: "Required" }}
                            error={errors.passwd}
                        />
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className={styleUtils.width100}>
                            Sign Up
                        </Button>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    )
}

export default LoginModel

