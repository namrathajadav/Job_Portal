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
import CategoryJobs from './Components/Jobs/CategoryJobs';
import SearchJobs from './Components/Jobs/SearchJobs';
import AppliedJobs from './Components/Jobs/AppliedJobs';
import ChangePassword from './Components/ChangePassword/ChangePassword';

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
           <Route path='/categoryJobs/:jobCategory' element={<CategoryJobs/>}/>
           <Route path='/searchJobsByRole/:role' element={<SearchJobs/>}/>
            <Route path='/searchJobsByLocation/:location' element={<SearchJobs/>}/>
             <Route path='/searchJobsByRoleAndLocation/:role/:location' element={<SearchJobs/>}/>
                <Route path='/companies' element={<Companies/>}/>
                <Route path='/myprofile' element={<Profile/>}/>
                <Route path='/appliedJobs' element={<AppliedJobs/>}/>
                <Route path='/changePassword' element={<ChangePassword/>}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
