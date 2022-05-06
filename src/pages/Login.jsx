import React, { useState } from "react";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom";

const API_URL = "http://sefdb02.qut.edu.au:3001"

export default function Login({ setIsAuth }){
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();
    const navigate = useNavigate();

    function login(){
        const url = `${API_URL}/user/login`;

        return fetch(url, {
            method: "POST",
            headers: { accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({email, password}),
        })
        .then(res => res.json()
        .then(res => {
            localStorage.setItem("token", res.token)
            setIsAuth(true)
        }))
        .then(navigate("/"))
        .catch((err) => {
            console.error(err);
            alert('An error occurred, please try again later.');
          })
    }

    return(
        <Container>
            <Row className="justify-content-center">
                <Col xs={4}>
                    <br></br>
                    <div className="shadow p-2 bg-white rounded">
                        <Row>
                            <h3>Sign In</h3>
                        </Row>
                        <Row>
                            <Form>
                                <Row>
                                    <Form.Group className="mb-3" controlId="loginEmail">
                                        <Form.Label>Email address:</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group className="mb-3" controlId="loginPassword">
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group  >
                                        <Button className="float-end" variant="secondary" type="submit" onClick={login}>
                                            Submit
                                        </Button>
                                    </Form.Group>
                                </Row>
                            </Form>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}