
import './App.css';
import { Routes,Route, Navigate } from 'react-router-dom';
import PageNotFound from './components/PageNotFound';
import AdminHome from './components/AdminHome';
import VisitorHome from './components/VisitorHome';
import Login from './components/Login';
import ListOfBooks from './components/ListOfBooks';
import Navbar from './components/Navbar';


function App() {
  return (
    <div className="App">
     
      <Routes>
      <Route path="/" element={<Navigate to="/login"/>}/>
      <Route path={"/login"} element={<Login/>} />
      <Route path={"/admin"} element={<AdminHome/>} />
      <Route path={"/user"} element={<VisitorHome/>} />
      <Route path={"/ListOfBooks"} element={<ListOfBooks/>} />
      <Route path={"*"} element={<PageNotFound/>} />
      </Routes>

    </div>
  );
}

export default App;
