import Table from 'rc-table';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Container, Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const NoteTable = (props) => {

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [noteUser, setViewNote] = useState();

    const handleClose = () => setShow(false);
    const handleView = (index) => {
        setViewNote(data[index]);
        setShow(true);
    };
    const handleDelete = (index) => {
        try {
            axios.delete(`/api/note/${data[index].id}`);
        } catch (err) {
            console.log(err.response.data.error);
        }
    }

    const handleUpdate = (index) => {
        navigate(`/note/update/${data[index].id}`);
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 200,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: 200,
        },
        {
            title: 'Operations',
            dataIndex: '',
            key: 'operations',
            render: (value, row, index) => {
                return (
                    <div>
                        <Button className="m-2" onClick={() => handleView(index)}>View</Button>
                        <Button className="m-2" onClick={() => handleUpdate(index)}>Update</Button>
                        <Button className="m-2" onClick={() => handleDelete(index)} variant="danger" >Delete</Button>
                    </div>
                );
            }
        },
    ];

    useEffect(() => {
        try {
            axios.get('/api/note/all').then((res) => {
                setData(res.data);
            });

        } catch (err) {
            console.log(err.response.data.error);
        }
    });

    return (
        <>
            <Container className="justify-content-center">
                <Table className="mt-5" columns={columns} data={data} getTrProps={handleView} />
            </Container>

            <Modal show={show} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{noteUser && noteUser.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {noteUser && noteUser.description}
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

export default NoteTable;