import React, { useRef } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useState, useEffect } from 'react';
import userService from "../services/userService";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toast } from 'primereact/toast';

function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [uname, setUname] = useState("")
  const [password, setPassword] = useState("")
  const [loggedIn, setLoggedIn] = useState(false);
  const toast = useRef(null);
  const navig = useNavigate();

  const showError = () => {
    toast.current.clear();
    toast.current.show({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 ,position:"top-center"});
  }

  useEffect(() => {
    if (errorMessage) {
      showError();
    }
  }, [errorMessage]);

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const user = await userService.userLogin(uname, password);
      if (user.error) {
        setErrorMessage(user.error);
      } else {
        localStorage.setItem("token", user.data.token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('role', user.data.role);
        setLoggedIn(true);
        localStorage.setItem('logged', true)
        if (user.data.role === "admin") {
          navig("/admin");
        } else {
          navig("/user");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Card style={{ width: '500px', padding: '40px' }}>
          <h3 className="MarginText">Login</h3>
          <Toast ref={toast} />
          <Form onSubmit={loginUser}>
            <Form.Group className="mb-3">
              <Form.Label className="cred"> Username: </Form.Label>
              <Form.Control type="text" placeholder="Username" value={uname} onChange={(e) => setUname(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="cred">Password:</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
          <br></br>
        </Card>
      </div>
    </>
  );
}

export default Login