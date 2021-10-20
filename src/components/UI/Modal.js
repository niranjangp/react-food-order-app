import { Fragment } from 'react';
import ReactDOM from 'react-dom'
import classes from './Modal.module.css';

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClick}/>
}

const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
}

const portalElem = document.getElementById('overlays');

const Modal = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClick={props.clickedClose}/>, portalElem)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElem)}
        </Fragment>
    );
}

export default Modal;