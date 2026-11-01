import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Jobs from './Components/Jobs/Jobs';
import Companies from './Components/Companies/Companies';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Profile from './Components/Profile/Profile';

function App() {
  return (
    <div className="App">
      <Router>
          <Header/>
        <Routes>
           <Route path='/' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
          <Route path='/home' element={<Home/>}/>
           <Route path='/jobs' element={<Jobs/>}/>
                <Route path='/companies' element={<Companies/>}/>
                <Route path='/myprofile' element={<Profile/>}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
