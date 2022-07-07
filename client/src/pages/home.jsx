import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { Navbar, Container, Button, Row, Col } from 'react-bootstrap';
import UserTable from '../components/userTable';

const Home = () => {
    const navigate = useNavigate();
    const user = Cookies.get('user') != null ? JSON.parse(Cookies.get('user')) : null;

    const handleLogout = async () => {
        try {
          const { data: res } = await axios.get('/api/auth/logout');
          console.log(res);
          navigate('/');
        } catch (err) {
          console.log(err.response.data.error);
        }
      }

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Surge Internship - Note App</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        {!user ? <Button href="/login">LOGIN</Button> : <Button onClick={handleLogout} >LOGOUT</Button>}
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className='mt-5'>
                <Row className="justify-content-md-center">
                    <Col xs lg="3">

                    </Col>
                    <Col md="auto">
                        {user && user.accountType === 'admin' && <Button href="/user/create">Create User</Button>}

                        {user && user.accountType === 'user' && <div><Button>Create Notes</Button>  <Button href="/user/create">Update Profile</Button></div>}
                    </Col>
                    <Col xs lg="3">
                    </Col>
                </Row>

                {user && user.accountType === 'admin' && <UserTable></UserTable> }

            </Container>


        </div>

    )
}

export default Home;