import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import { Form, Button, Container } from 'react-bootstrap';

const NoteForm = (props) => {
    const navigate = useNavigate();
    const { noteID } = useParams();
    const user = Cookies.get('user') != null ? JSON.parse(Cookies.get('user')) : null;

    const [data, setData] = useState({
        title: "",
        description: "",
        userID: user.id
    })

    const [error, setError] = useState('');

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    }

    const handleSubmit = async (e) => {
        let res;
        e.preventDefault();
        try {
            if(typeof(noteID) === 'undefined'){
                res = await axios.post('/api/note/create', data);
            }else{
                res = await axios.patch(`/api/note/${noteID}`,data);
            }
            console.log(res);
            navigate('/');
        } catch (err) {
            console.log(err.response.data.error);
            setError(err.response.data.error);
        }
    }

    useEffect(() => {

        // request server for authentication check (/api/isAuth) or check user cookie
        // redirect based on auth
        let user = Cookies.get('user');

        if (user !== undefined) {
            if (user == null) {
                navigate('/');
            }
        } else {
            navigate('/');
        }
    });

    return (
        <Container className="w-50 mt-5 justify-content-center">
            <h2 className="mb-5 text-center">Note FORM</h2>
            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Title</Form.Label>
                    <Form.Control type="text" name='title' required onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Description</Form.Label>
                    <Form.Control as="textarea" type="text" name='description' required onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Text className="text-danger fw-bold fst-italic text-uppercase" name='error'>
                        {error}
                    </Form.Text>
                </Form.Group>
                { typeof(noteID) === 'undefined' ? <Button variant="primary" type="submit"> Create </Button> : <Button variant="primary" type="submit"> Update </Button> }
                
            </Form>
        </Container>
    )
}

export default NoteForm;