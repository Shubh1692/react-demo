import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
export const ImageUpload = ({
    onImageUpload, handleClose, onImageChnage
}) => (
        <Form onSubmit={(event) => {
            event.preventDefault();
            onImageUpload();
        }}>
            <Modal.Header closeButton onHide={handleClose}>
                <Modal.Title> Upload Image </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="file">
                    <Form.Label>Image upload</Form.Label>
                    <Form.Control type="file" placeholder="Enter Album name" required onChange={(e)=>onImageChnage(e)} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" type="button" onClick={handleClose}>Close</Button>
                <Button variant="primary" type="submit">Save changes</Button>
            </Modal.Footer>
        </Form>
    );
export default ImageUpload;