import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './components/common/Navbar';
import Error from './Pages/Error';
import SignupForm from './components/core/auth/SignupForm';
import LoginForm from './components/core/auth/LoginForm';
import SendData from './Pages/SendData';
import Dashboard from './Pages/Dashboard';
import { useSelector } from 'react-redux';


function App() {
  const {user} = useSelector( (state) => state.profile)
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
     <Routes>
      
      <Route path='/' element ={<Home/>}/>

      <Route path='/signup' element ={<SignupForm/>}/>
      <Route path='/login' element={<LoginForm/>}/>
      <Route path='/sendData' element={<SendData/>}/>

      {
        user && (
          <Route path='/dashboard' element={<Dashboard/>}/>
        )
      }

      <Route path='*' element={<Error/>}/>
     </Routes>
    </div>
  );
}

export default App;
