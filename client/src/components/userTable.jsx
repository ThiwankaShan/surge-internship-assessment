import Table from 'rc-table';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Container, Modal, ListGroup} from 'react-bootstrap';

const UserTable = () => {

    const [show, setShow] = useState(false);
    const [viewUser, setViewUser] = useState();

    const handleClose = () => setShow(false);
    const handleShow = (index) => {
        setViewUser(data[index]);
        setShow(true);
    };

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            width: 200,
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
            width: 200,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 200,
        },
        {
            title: 'Account Type',
            dataIndex: 'accountType',
            key: 'status',
            width: 200,
        },
        {
            title: 'Operations',
            dataIndex: '',
            key: 'operations',
            render: (value, row, index) => <div><Button href="#" onClick={() => handleShow(index)}>View</Button></div>,
        },
    ];

    let [data, setData] = useState([]);

    useEffect(() => {
        try {
            axios.get(`/api/user/all`).then((res) => {
                setData(res.data);
            });

        } catch (err) {
            console.log(err.response.data.error);
        }
    });

    return (
        <>
            <Container className="justify-content-center">
                <Table className="mt-5" columns={columns} data={data} getTrProps={handleShow} />
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{viewUser && viewUser.firstName + ' ' + viewUser.lastName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup as="ol" numbered>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">First Name</div>
                                {viewUser && viewUser.firstName}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Last Name</div>
                                {viewUser && viewUser.lastName}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Account Type</div>
                                {viewUser && viewUser.accountType}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Mobile Number</div>
                                {viewUser && viewUser.mobile}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Date of Birth</div>
                                {viewUser && viewUser.dateOfBirth.slice(0,10)}
                            </div>
                        </ListGroup.Item>

                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UserTable;