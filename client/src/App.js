import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserForm from './pages/userForm';
import NoteForm from './pages/noteForm';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <div className='pages'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/user/create' element={< UserForm/>} />
            <Route path='/note/create' element={< NoteForm/>} />
            <Route path='/note/update/:noteID' element={< NoteForm/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
