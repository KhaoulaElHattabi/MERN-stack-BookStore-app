
import './App.css';
import { Routes,Route } from 'react-router-dom';
import PageNotFound from './components/PageNotFound';
import Register from './components/Register'
import Login from './components/Login';



function App() {
  return (
    <div className="App">
      <Routes>
      <Route path={"/login"} element={<Login/>} />
      <Route path={"/register"} element={<Register/>} />
      <Route path={"*"} element={<PageNotFound/>} />
      </Routes>

    </div>
  );
}

export default App;
