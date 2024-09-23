import { useEffect } from 'react';
import './App.css';
import Navbar from './component/Navbar';
import Allroutes from './Allroutes';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { LOGINSUCCESS, LOGINFAILURE } from './redux/actionType';
import Footer from './component/Footer';
import NotificationBar from './page/NotificationBar';

function App() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      // Send request to backend to verify token
      axios
        .post('https://dairy-xesa.onrender.com/verifyToken', { token })
        .then((response) => {
          if (response.data.isValid) {
            // If token is valid, dispatch LOGINSUCCESS to store user in Redux
            dispatch({
              type: LOGINSUCCESS,
              payload: { token, user: JSON.parse(user) }
            });
          } else {
            // If token is invalid, clear storage and log out the user
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            dispatch({ type: LOGINFAILURE, payload: 'Invalid token' });
          }
        })
        .catch((error) => {
          console.error('Token verification failed:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          dispatch({ type: LOGINFAILURE, payload: 'Token verification failed' });
        });
    }
  }, [dispatch]);

  return (
    <div className='app'>
      <Navbar />
      <NotificationBar />
      <div style={{paddingTop:"120px"}}>
      <Allroutes />
      <Footer/>
      </div>
    </div>
  );
}

export default App;
