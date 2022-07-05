import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { Form, Button, Container } from 'react-bootstrap';

const Login = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const [error, setError] = useState('');

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data: res } = await axios.post('/api/auth/login', data);
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
            if (user != null) {
                user = JSON.parse(user);
                if (!user.status) {
                    // navigate(''); // path for user profile update page
                    navigate('/');
                    console.log(user.status);
                    return;
                }
            }else{
                navigate('/');
            }
        }
    });

    return (
        <Container className="w-50 mt-5 justify-content-center">
            <h2 className="mb-5 text-center">LOGIN FORM</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="fw-bold">Email address</Form.Label>
                    <Form.Control type="email" name='email' value={data.email} required onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="fw-bold">Password</Form.Label>
                    <Form.Control type="password" name='password' required onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Text className="text-danger fw-bold fst-italic text-uppercase" name='error'>
                        {error}
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </Container>
    )
}

export default Login;