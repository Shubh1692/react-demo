import React, { Component } from 'react';
import { Table, Button, Modal, DropdownButton, Dropdown, Card } from 'react-bootstrap';
import AddressModal from './AddressModal';
import { API_DOMAIN } from '../../constant';

class AddressList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addresses: []
        }
    }

    async componentDidMount() {
        await this.getAllAddress();
    }

    async getAllAddress() {
        const { user } = this.props;
        const apiReq = await fetch(`${API_DOMAIN}address/${user._id}`, {
            method: 'GET'
        });
        if (apiReq.status !== 200) {
            return alert('Error in fetching list');
        }
        const {
            addresses
        } = await apiReq.json();
        await this.setState({
            addresses
        });
    }

    async onAddUpdateAddress({
        address, city, state, country, pincode, _id
    }) {
        const { user } = this.props;
        const body = JSON.stringify({
            address, city, state, country, pincode, userId: user._id
        });
        const apiReq = await fetch(`${API_DOMAIN}address/${_id ? `${_id}/` : ''}`, {
            method: _id ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body
        });
        if (apiReq.status !== 200) {
            return alert('Error in add/update address');
        }
        const updateAddress = await apiReq.json();
        let addresses = [...this.state.addresses];
        if (_id) {
            const addressIndex = addresses.findIndex((address) => address._id === _id);
            if (addressIndex !== -1)
                addresses[addressIndex] = updateAddress.address;
        } else {
            addresses = [updateAddress.address, ...addresses]
        }
        await this.setState({
            addresses,
            openAddUpdateAddressModal: false
        });
    }

    async deleteAddress({
        _id
    }) {
        if (!window.confirm('Are you sure want to delete address')) return;
        const apiReq = await fetch(`${API_DOMAIN}address/${_id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (apiReq.status !== 200) {
            return alert('Error in delete user');
        }
        let addresses = [...this.state.addresses];
        const addressIndex = addresses.findIndex((user) => user._id === _id);
        if (addressIndex !== -1)
            addresses.splice(addressIndex, 1);;
        await this.setState({
            addresses,
        });
    }


    async handleClose() {
        await this.setState({
            openAddUpdateAddressModal: false
        })
    }

    render() {
        const { addresses = [], openAddUpdateAddressModal, ediAddressDetail } = this.state;
        const { handleClose } = this.props;
        return (
            <React.Fragment>
                <Modal.Header closeButton onHide={handleClose}>
                    <Modal.Title>
                        <Button type="button" onClick={async () => {
                            await this.setState({
                                openAddUpdateAddressModal: true,
                                ediAddressDetail: null
                            })
                        }}>Add New Address</Button>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {addresses.length ? <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Address</th>
                                <th>State</th>
                                <th>Country</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {addresses.map(({
                                _id, address, city, country, state, pincode
                            }) => (
                                    <tr key={_id}>
                                        <td>{`${address} ${city} ${pincode}`}</td>
                                        <td>{state}</td>
                                        <td>{country}</td>
                                        <td>
                                            <DropdownButton
                                                title={'Actions'}
                                                variant={'secondary'}
                                            >
                                                <Dropdown.Item onClick={async () => {
                                                    await this.setState({
                                                        openAddUpdateAddressModal: true,
                                                        ediAddressDetail: {
                                                            _id, address, city, country, state, pincode
                                                        },
                                                    })
                                                }}>
                                                    Edit
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={async () => {
                                                    await this.deleteAddress({
                                                        _id
                                                    })
                                                }}>
                                                    Delete
                                                </Dropdown.Item>
                                            </DropdownButton>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table> : <Card>
                            <Card.Body>
                                <Card.Title>No Address</Card.Title>
                                <Card.Text>
                                    This user don't have any address. Please add new  address
                             </Card.Text>
                                <Button variant="primary" onClick={async () => {
                                    await this.setState({
                                        openAddUpdateAddressModal: true,
                                        ediAddressDetail: null
                                    })
                                }}>Add new address</Button>
                            </Card.Body>
                        </Card>}
                </Modal.Body>
                {openAddUpdateAddressModal && <Modal show={openAddUpdateAddressModal} onHide={() => this.handleClose()}>
                    <AddressModal {
                        ...{
                            address: ediAddressDetail ? ediAddressDetail.address : '',
                            city: ediAddressDetail ? ediAddressDetail.city : '',
                            country: ediAddressDetail ? ediAddressDetail.country : '',
                            state: ediAddressDetail ? ediAddressDetail.state : '',
                            _id: ediAddressDetail ? ediAddressDetail._id : '',
                            pincode: ediAddressDetail ? ediAddressDetail.pincode : '',
                            onAddUpdateAddress: ({ address, city, country, state, _id, pincode }
                            ) => this.onAddUpdateAddress({
                                address, city, country, state, _id, pincode
                            }),
                            handleClose: () => this.handleClose()
                        }
                    }
                    /> </Modal>}

            </React.Fragment>
        );
    }
}

export default AddressList;
