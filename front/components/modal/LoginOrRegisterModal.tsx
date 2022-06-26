import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Modal from "@mui/material/Modal";

const LoginOrRegisterModal = ({ open, handleClose }) => {
    const [register, setRegister] = useState<Boolean>(false);

    const Wrapper = React.forwardRef<HTMLInputElement>((props, ref) => {
        return (
            <span {...props} ref={ref}>
                {props.children}
            </span>
        );
        Wrapper.displayName = "Wrapper";
    });

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {register ? (
                <Wrapper>
                    <Register
                        handleClose={handleClose}
                        setRegister={setRegister}
                    />
                </Wrapper>
            ) : (
                <Wrapper>
                    <Login
                        handleClose={handleClose}
                        setRegister={setRegister}
                    />
                </Wrapper>
            )}
        </Modal>
    );
};

export default LoginOrRegisterModal;
