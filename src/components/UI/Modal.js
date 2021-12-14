import classes from "./Modal.module.css";
import { Fragment } from "react";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div onClick={props.onClick} className={classes.backdrop} />;
};

const ModalOverlay = (props) => {
  return <div className={classes.modal}>{props.children}</div>;
};

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onBackdropClick} />,
        document.getElementById("modal")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById("modal")
      )}
    </Fragment>
  );
};

export default Modal;
