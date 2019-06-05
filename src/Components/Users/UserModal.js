import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
export const UserModel = ({
    name = '', _id, email = '', onAddUpdateUser, handleClose
}) => (
        <Form onSubmit={(event) => {
            event.preventDefault();
            const form = event.currentTarget;
            onAddUpdateUser({
                name: form.elements.name.value,
                email: form.elements.email.value,
                _id
            });
        }}>
            <Modal.Header closeButton onHide={handleClose}>
                <Modal.Title> {`${_id ? 'Update' : 'Add new'}`} user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control defaultValue={name} type="text" placeholder="Enter name" required />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control defaultValue={email} type="email" placeholder="Enter email" required />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" type="button" onClick={handleClose}>Close</Button>
                <Button variant="primary" type="submit">Save changes</Button>
            </Modal.Footer>
        </Form>
    );
export default UserModel;