import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
export const AlbumModal = ({
    _id = '', name = '', onAddUpdateAlbum, handleClose
}) => (
        <Form onSubmit={(event) => {
            event.preventDefault();
            const form = event.currentTarget;
            onAddUpdateAlbum({
                name: form.elements.name.value,
                _id
            });
        }}>
            <Modal.Header closeButton onHide={handleClose}>
                <Modal.Title> {`${_id ? 'Update' : 'Add new'}`} album </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="name">
                    <Form.Label>Album Name</Form.Label>
                    <Form.Control defaultValue={name} type="text" placeholder="Enter Album name" required />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" type="button" onClick={handleClose}>Close</Button>
                <Button variant="primary" type="submit">Save changes</Button>
            </Modal.Footer>
        </Form>
    );
export default AlbumModal;