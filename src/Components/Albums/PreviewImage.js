import React from 'react';
import { Modal, Image } from 'react-bootstrap';
import { API_DOMAIN } from '../../constant';
export const PreviewImage = ({
    name, handleClose
}) => (
        <React.Fragment>
            <Modal.Header closeButton onHide={handleClose}>
                <Modal.Title> {name} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Image src={`${API_DOMAIN}images/${name}`} fluid />
            </Modal.Body>
        </React.Fragment>
    );
export default PreviewImage;