
import './App.css';
import { Routes,Route, Navigate } from 'react-router-dom';
import PageNotFound from './components/PageNotFound';
import AdminHome from './components/AdminHome';
import VisitorHome from './components/VisitorHome';
import Login from './components/Login';
import ListOfBooks from './components/ListOfBooks';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import withAuth from './components/withAuth'


function App() {
  const ProtectedVisitorHome = withAuth(VisitorHome, ["user"]);
  const ProtectedAdminHome= withAuth(AdminHome,["admin"])
  const ProtectedAboutUs= withAuth(AboutUs,["admin","user"])
  const ProtectedListOfBooks=withAuth(ListOfBooks,["admin","user"])


  return (
    <div className="App">
     
      <Routes>
      <Route path="/" element={<Navigate to="/login"/>}/>
      <Route path={"/home"} element={<Home/>} />
      <Route path={"/login"} element={<Login/>} />
      <Route path={"/admin"} element={<ProtectedAdminHome />} />
      <Route path={"/user"} element={<ProtectedVisitorHome />} />
      <Route path={"/list_books"} element={<ProtectedListOfBooks/>} />
      <Route path={"/about_us"} element={<ProtectedAboutUs/>} />
      <Route path={"*"} element={<PageNotFound/>} />
      </Routes>

    </div>
  );
}

export default App;
