import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
export const AddressModal = ({
    _id = '', address = '', city = '', country = '', state = '', pincode = '', onAddUpdateAddress, handleClose
}) => (
        <Form onSubmit={(event) => {
            event.preventDefault();
            const form = event.currentTarget;
            onAddUpdateAddress({
                address: form.elements.address.value,
                city: form.elements.city.value,
                country: form.elements.country.value,
                state: form.elements.state.value,
                pincode: form.elements.pincode.value,
                _id
            });
        }}>
            <Modal.Header closeButton onHide={handleClose}>
                <Modal.Title> {`${_id ? 'Update' : 'Add new'}`} address {pincode}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control defaultValue={address} type="text" placeholder="Enter address" required />
                </Form.Group>

                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control defaultValue={city} type="text" placeholder="Enter city" required />
                </Form.Group>
                <Form.Group controlId="state">
                    <Form.Label>State</Form.Label>
                    <Form.Control defaultValue={state} type="text" placeholder="Enter state" required />
                </Form.Group>
                <Form.Group controlId="country">
                    <Form.Label>country</Form.Label>
                    <Form.Control defaultValue={country} type="text" placeholder="Enter country" required />
                </Form.Group>
                <Form.Group controlId="pincode">
                    <Form.Label>Pincode</Form.Label>
                    <Form.Control defaultValue={pincode} type="number" placeholder="Enter pincode" required />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" type="button" onClick={handleClose}>Close</Button>
                <Button variant="primary" type="submit">Save changes</Button>
            </Modal.Footer>
        </Form>
    );
export default AddressModal;