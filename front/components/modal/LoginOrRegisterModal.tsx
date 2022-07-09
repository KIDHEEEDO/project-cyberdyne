import React from "react";
import LoginOrRegister from "./LoginOrRegister";
import Modal from "@mui/material/Modal";

const LoginOrRegisterModal = ({ open, handleClose }) => {

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <LoginOrRegister handleClose={handleClose} />
        </Modal>
    );
};

export default LoginOrRegisterModal;
