import React, { Component } from 'react';
import { Row, Col, Button, Modal, Card, Breadcrumb } from 'react-bootstrap';
import AlbumModal from './AlbumModal';
import ImageUpload from './ImageUpload';
import { API_DOMAIN } from '../../constant';
import PreviewImage from './PreviewImage';
class AlbumList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            albums: [],
            parentId: props.user._id,
            breadcrumb: [{
                name: props.user.name,
                _id: props.user._id
            }]
        }
    }

    async componentDidMount() {
        await this.getAllAlbums();
    }

    async getAllAlbums() {
        const { parentId } = this.state;
        const apiReq = await fetch(`${API_DOMAIN}album/${parentId}`, {
            method: 'GET'
        });
        if (apiReq.status !== 200) {
            return alert('Error in fetching list');
        }
        const {
            albums
        } = await apiReq.json();
        await this.setState({
            albums
        });
    }

    async onAddUpdateAlbum({
        name, _id
    }) {
        const { user } = this.props;
        const { parentId } = this.state;
        const body = JSON.stringify({
            name, userId: user._id, type: 'album', parentId
        });
        const apiReq = await fetch(`${API_DOMAIN}album/${_id ? `${_id}/` : ''}`, {
            method: _id ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body
        });
        if (apiReq.status !== 200) {
            return alert('Error in add/update albums');
        }
        const updateAlbums = await apiReq.json();
        let albums = [...this.state.albums];
        if (_id) {
            const albumsIndex = albums.findIndex((albums) => albums._id === _id);
            if (albumsIndex !== -1)
                albums[albumsIndex] = updateAlbums.album;
        } else {
            albums = [updateAlbums.album, ...albums]
        }
        await this.setState({
            albums,
            openAddUpdateAlbumModal: false
        });
    }

    async deleteAlbum({
        _id
    }) {
        if (!window.confirm('Are you sure want to delete albums')) return;
        const apiReq = await fetch(`${API_DOMAIN}album/${_id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (apiReq.status !== 200) {
            return alert('Error in delete user');
        }
        let albums = [...this.state.albums];
        const albumsIndex = albums.findIndex((user) => user._id === _id);
        if (albumsIndex !== -1)
            albums.splice(albumsIndex, 1);;
        await this.setState({
            albums,
        });
    }


    async handleClose() {
        await this.setState({
            openAddUpdateAlbumModal: false,
            openAddImageModal: false,
            openPreviewImage: false,
            editAlbumDetail: null
        })
    }

    async openAlbum({
        parentId, name
    }) {
        let breadcrumb = [...this.state.breadcrumb];
        console.log(breadcrumb)
        const breadcrumbExist = breadcrumb.findIndex((bread) => bread._id === parentId);
        if (breadcrumbExist === -1) {
            breadcrumb.push({
                name,
                _id: parentId
            });
        } else {
            breadcrumb = breadcrumb.slice(0, breadcrumbExist + 1);
        }
        await this.setState({
            parentId,
            breadcrumb
        });
        await this.getAllAlbums();
    }

    async onImageUpload() {
        const { user } = this.props;
        const { parentId, file } = this.state;
        const body = new FormData();
        body.append('album', file);
        body.append('parentId', parentId);
        body.append('userId', user._id);
        const apiReq = await fetch(`${API_DOMAIN}upload/`, {
            method: 'POST',
            body
        });
        if (apiReq.status !== 200) {
            return alert('Error in delete user');
        }
        const { album } = await apiReq.json();
        let albums = [...this.state.albums];
        albums = [album, ...albums];
        await this.setState({
            albums,
            openAddImageModal: false
        });
    }

    onImageChnage(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
    }

    render() {
        const { albums = [], openAddUpdateAlbumModal, editAlbumDetail, breadcrumb = [], openAddImageModal, imagePreviewUrl, openPreviewImage } = this.state;
        const { handleClose } = this.props;
        return (
            <React.Fragment>
                <Modal.Header closeButton onHide={handleClose}>
                    <Modal.Title className="d-flex align-item-center justify-content-between w-100">
                        <Button type="button" onClick={async () => {
                            await this.setState({
                                openAddUpdateAlbumModal: true,
                                editAlbumDetail: null
                            })
                        }}>Add New Albums</Button>
                        <Button type="button" onClick={async () => {
                            await this.setState({
                                openAddImageModal: true,
                                editAlbumDetail: null
                            })
                        }}>Add New Image</Button>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Header>
                    <Breadcrumb>
                        {breadcrumb.map((crumb) => (
                            <Breadcrumb.Item key={crumb._id} onClick={() => {
                                this.openAlbum({
                                    parentId: crumb._id, name: crumb.name
                                });
                            }}>{crumb.name}</Breadcrumb.Item>
                        ))}
                    </Breadcrumb>
                </Modal.Header>
                <Modal.Body>
                    {albums.length ? <Row className="show-grid"> {albums.map(({
                        name, _id, type
                    }) => (
                            <Col xs={6} md={4} key={_id} className="mt-4">
                                <Card>
                                    <Card.Body>
                                        <Card.Title style={{
                                            'white-space': 'nowrap',
                                            'overflow': 'hidden',
                                            'text-overflow': 'ellipsis'
                                        }}>{name}</Card.Title>
                                    </Card.Body>
                                   
                                    {type === 'album' && <Card.Body className="d-flex align-item-center justify-content-between">
                                        <Button className="w-100 ml-2 mr-2" variant="primary" onClick={async () => {
                                            await this.openAlbum({
                                                parentId: _id,
                                                name
                                            })
                                        }}>Open Album</Button></Card.Body>}
                                    {type === 'image' && <Card.Body className="d-flex align-item-center justify-content-between">
                                        <Button className="w-100" variant="primary" onClick={async () => {
                                            await this.setState({
                                                openPreviewImage: true,
                                                editAlbumDetail: {
                                                    _id, name
                                                },
                                            })
                                        }}>Open Image</Button></Card.Body>}
                                         <Card.Body className="d-flex align-item-center justify-content-between">
                                        {type === 'album' && <Button className="w-100 ml-2 mr-2" variant="primary" onClick={async () => {
                                            await this.setState({
                                                openAddUpdateAlbumModal: true,
                                                editAlbumDetail: {
                                                    _id, name
                                                },
                                            })
                                        }}>Edit</Button>}
                                        <Button className="w-100 ml-2 mr-2" variant="danger" onClick={async () => {
                                            await this.deleteAlbum({
                                                _id
                                            })
                                        }}>Delete</Button></Card.Body>
                                </Card>
                            </Col>
                        ))} </Row> : <Card>
                            <Card.Body>
                                <Card.Title>No Albums</Card.Title>
                                <Card.Text>
                                    This user don't have any Album/Image. Please add new  Album/Image
                             </Card.Text>
                                <Button variant="primary" onClick={async () => {
                                    await this.setState({
                                        openAddUpdateAlbumModal: true,
                                        editAlbumDetail: null
                                    })
                                }}>Add new albums</Button>
                            </Card.Body>
                        </Card>}
                </Modal.Body>
                {openAddUpdateAlbumModal && <Modal show={openAddUpdateAlbumModal} onHide={() => this.handleClose()}>
                    <AlbumModal {
                        ...{
                            name: editAlbumDetail ? editAlbumDetail.name : '',
                            onAddUpdateAlbum: ({ name, _id }
                            ) => this.onAddUpdateAlbum({
                                name, _id
                            }),
                            handleClose: () => this.handleClose()
                        }
                    }
                    /> </Modal>}
                {openAddImageModal && <Modal show={openAddImageModal} onHide={() => this.handleClose()}>
                    <ImageUpload {
                        ...{
                            onImageUpload: () => this.onImageUpload(),
                            handleClose: () => this.handleClose(),
                            imagePreviewUrl,
                            onImageChnage: (e) => this.onImageChnage(e)
                        }
                    }
                    /> </Modal>}
                {openPreviewImage && <Modal show={openPreviewImage} onHide={() => this.handleClose()}>
                    <PreviewImage {
                        ...{
                            name: editAlbumDetail ? editAlbumDetail.name : '',
                            handleClose: () => this.handleClose(),
                        }
                    }
                    /> </Modal>}

            </React.Fragment>
        );
    }
}

export default AlbumList;
