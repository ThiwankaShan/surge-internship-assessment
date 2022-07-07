import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { Form, Button, Container } from 'react-bootstrap';

const UserForm = () => {
    const navigate = useNavigate();
    const user = Cookies.get('user') != null ? JSON.parse(Cookies.get('user')) : null;

    const [data, setData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        accountType: "user",
        dateOfBirth: "",
        mobile: -1,
        status: false
    })

    const [error, setError] = useState('');

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    }

    const handleSubmit = async (e) => {
        let res;
        e.preventDefault();
        try {
            if(user.accountType === "admin"){
                res = await axios.post('/api/user/create', data);
            }else{
                res = await axios.patch(`/api/user/${user.id}`,data);
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
            <h2 className="mb-5 text-center">USER FORM</h2>
            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">First Name</Form.Label>
                    <Form.Control type="text" name='firstName' placeholder={user.accountType === 'user' && user.firstName} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Last Name</Form.Label>
                    <Form.Control type="text" name='lastName' placeholder={user.accountType === 'user' && user.lastName} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder={user.accountType === 'user' && user.email} required onChange={handleChange} />
                </Form.Group>

                {user.accountType !== 'admin' &&
                <>
                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Password</Form.Label>
                    <Form.Control type="password" name='password' required onChange={handleChange} />
                </Form.Group>
                </>
                }
                

                <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">Date of Birth</Form.Label>
                    <Form.Control type="date" name='dateOfBirth' onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Text className="text-danger fw-bold fst-italic text-uppercase" name='error'>
                        {error}
                    </Form.Text>
                </Form.Group>

                {user && user.accountType === 'admin' &&  <Button variant="primary" type="submit"> Create </Button> }

                {user && user.accountType === 'user' &&  <Button variant="primary" type="submit"> Update </Button> }
                
            </Form>
        </Container>
    )
}

export default UserForm;