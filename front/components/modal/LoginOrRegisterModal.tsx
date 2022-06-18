import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Modal from '@mui/material/Modal';

const LoginOrRegisterModal = ({ open, handleClose }) => {
    const [register, setRegister] = useState<Boolean>(false);

    return (
        open && (
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {
                    register ? (
                        <Register
                            open={open}
                            setRegister={setRegister}
                            handleClose={handleClose}
                        />
                    ) : (
                        <Login
                            open={open}
                            setRegister={setRegister}
                            handleClose={handleClose}
                        />
                    )
                }
            </Modal>
        )
    )
}

export default LoginOrRegisterModal;

