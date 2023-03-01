import './App.css';
import { Routes,Route, Navigate } from 'react-router-dom';
import PageNotFound from './components/PageNotFound';
import AdminHome from './components/AdminHome';
import VisitorHome from './components/VisitorHome';
import Login from './components/Login';
import ListOfBooks from './components/ListOfBooks';
import AboutUs from './components/AboutUs';
import withAuth from './components/withAuth'
import LandingPage from './components/LandingPage';
import FormBook from './components/FormBook';
import UserTable from './components/UserTable'



import "primeflex/primeflex.css";

function App() {
  const ProtectedVisitorHome = withAuth(VisitorHome, ["user"]);
  const ProtectedAdminHome=withAuth(AdminHome,["admin"])
  const ProtectedForm=withAuth(FormBook,["admin"])
  const ProtectedListUsr=withAuth(UserTable,["admin"])



  return (
    <div className="App">
     
      <Routes>
      <Route path={"/store"} element={<LandingPage/>} />
      <Route path="/" element={<Navigate to="/store"/>}/>
      <Route path={"/book-add"} element={<ProtectedForm/>} />
      <Route path={"/login"} element={<Login/>} />
      <Route path={"/admin"} element={<ProtectedAdminHome />} />
      <Route path={"/user"} element={<ProtectedVisitorHome />} />
      <Route path={"/list_books"} element={<ListOfBooks/>} />
      <Route path={"/about_us"} element={<AboutUs/>} />
      <Route path={"/users"} element={<ProtectedListUsr/>} />
      <Route path={"*"} element={<PageNotFound/>} />
      </Routes>

    </div>
  );
}

export default App;