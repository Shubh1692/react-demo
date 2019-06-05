import React, { Component } from 'react';
import { Table, Button, Navbar, Modal, Dropdown, DropdownButton, Card } from 'react-bootstrap';
import UserModal from './UserModal';
import AddressList from '../Addresses';
import AlbumList from  '../Albums';
import { API_DOMAIN } from '../../constant';

class UserList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            editUserDetail: null,
        }
    }

    async componentDidMount() {
        await this.getAllUsers();
    }

    async getAllUsers() {
        const apiReq = await fetch(`${API_DOMAIN}user/`, {
            method: 'GET'
        });
        if (apiReq.status !== 200) {
            return alert('Error in fetching list');
        }
        const {
            users
        } = await apiReq.json();
        await this.setState({
            users
        });
    }

    async onAddUpdateUser({
        name, email, _id
    }) {
        const body = JSON.stringify({
            name,
            email
        });
        const apiReq = await fetch(`${API_DOMAIN}user/${_id ? `${_id}/` : ''}`, {
            method: _id ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body
        });
        if (apiReq.status !== 200) {
            return alert('Error in add/update user');
        }
        const {
            user
        } = await apiReq.json();
        let users = [...this.state.users];
        if (_id) {
            const userIndex = users.findIndex((user) => user._id === _id);
            if (userIndex !== -1)
                users[userIndex] = user;
        } else {
            users = [user, ...users]
        }
        await this.setState({
            users,
            openAddUpdateUserModal: false
        });
    }

    async deleteUser({
        _id
    }) {
        if (!window.confirm('Are you sure want to delete user')) return;
        const apiReq = await fetch(`${API_DOMAIN}user/${_id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (apiReq.status !== 200) {
            return alert('Error in delete user');
        }
        let users = [...this.state.users];
        const userIndex = users.findIndex((user) => user._id === _id);
        if (userIndex !== -1)
            users.splice(userIndex, 1);
        await this.setState({
            users,
        });
    }


    async handleClose() {
        await this.setState({
            openAddUpdateUserModal: false,
            editUserDetail: null,
            openShowAddressModal: false,
            openShowAlbumModal: false
        })
    }

    render() {
        const { users, openAddUpdateUserModal, editUserDetail, openShowAddressModal, openShowAlbumModal } = this.state;
        return (
            <div className="d-flex align-items-center justify-content-center h-100 flex-column ">
                <Navbar className="bg-light justify-content-end w-100">
                    <Button type="button" onClick={async () => {
                        await this.setState({
                            openAddUpdateUserModal: true,
                            editUserDetail: null
                        })
                    }}>Add New User</Button>
                </Navbar>
                {users.length ? <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Albums</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(({
                            _id, name, email, addresses, albums
                        }) => (
                                <tr key={_id}>
                                    <td>{name}</td>
                                    <td>{email}</td>
                                    <td>{<Button onClick={async () => {
                                        await this.setState({
                                            openShowAddressModal: true,
                                            editUserDetail: {
                                                _id, name, email
                                            },
                                        })
                                    }}>
                                        Show Address
                                    </Button>}</td>
                                    <td>{<Button onClick={async () => {
                                        await this.setState({
                                            openShowAlbumModal: true,
                                            editUserDetail: {
                                                _id, name, email
                                            },
                                        })
                                    }}>
                                        Show Albums
                                    </Button>}</td>
                                    <td>
                                        <DropdownButton
                                            title={'Actions'}
                                            variant={'secondary'}
                                        >
                                            <Dropdown.Item onClick={async () => {
                                                await this.setState({
                                                    openAddUpdateUserModal: true,
                                                    editUserDetail: {
                                                        _id, name, email
                                                    },
                                                })
                                            }} >
                                                Edit
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={async () => {
                                                await this.deleteUser({
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
                </Table> :
                    <Card>
                        <Card.Body>
                            <Card.Title>No users</Card.Title>
                            <Card.Text>
                                You don't have users yet. Please add users
                             </Card.Text>
                            <Button variant="primary" onClick={async () => {
                                await this.setState({
                                    openAddUpdateUserModal: true,
                                    editUserDetail: null
                                })
                            }}>Add new Users</Button>
                        </Card.Body>
                    </Card>}
                {openAddUpdateUserModal && <Modal show={openAddUpdateUserModal} onHide={() => this.handleClose()}>

                    <UserModal {
                        ...{
                            name: editUserDetail ? editUserDetail.name : '',
                            email: editUserDetail ? editUserDetail.email : '',
                            _id: editUserDetail ? editUserDetail._id : '',
                            onAddUpdateUser: ({ name, email, _id }
                            ) => this.onAddUpdateUser({
                                name, email, _id
                            }),
                            handleClose: () => this.handleClose()
                        }
                    }
                    /> </Modal>}
                {openShowAddressModal && <Modal show={openShowAddressModal} onHide={() => this.handleClose()}>
                    <AddressList {
                        ...{
                            user: editUserDetail,
                            handleClose: () => this.handleClose()
                        }
                    }
                    /> </Modal>}
                 {openShowAlbumModal && <Modal size="lg" show={openShowAlbumModal} onHide={() => this.handleClose()}>
                    <AlbumList {
                        ...{
                            user: editUserDetail,
                            handleClose: () => this.handleClose()
                        }
                    }
                    /> </Modal>}

            </div>
        );
    }
}

export default UserList;
