import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';



 function Login(){
    return(
        <>
        <h3 className="MarginText">Login</h3>
        <br></br>
        <Form className="login" >
      <Form.Group className="mb-3" >
        <Form.Label >Enter username</Form.Label>
        <Form.Control type="text"  placeholder="username" />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Enter password</Form.Label>
        <Form.Control type="password"  placeholder="password" />
      </Form.Group>
      
      
      <Button variant="primary" type="submit" >
        Enregistrer
      </Button>
    </Form>
    </>
    );
}

export default Login
