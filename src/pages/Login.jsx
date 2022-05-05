import React, { useState } from "react";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useNavigate } from "react-router-dom";
// import { useLogin } from "../api";

const API_URL = "http://sefdb02.qut.edu.au:3001"

export default function Login({ setIsAuth }){
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();
    const navigate = useNavigate();
    // const { loading, login, error } = useLogin(email, password);
    // const { loading, login, error } = useLogin(email, password);

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
                    <form className="shadow p-2 bg-white rounded" onSubmit={(event) =>{
                        event.preventDefault();
                    }}>
                    <h3>Sign In</h3>
                    <div className="form-group">
                        <label htmlFor="email">Email Address:</label>
                        <input type="email" name="email" id="email" value={email} onChange={(e) => {setEmail(e.target.value)}} className="form-control" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password" value={password} onChange={(e) => {setPassword(e.target.value)}} className="form-control" placeholder="Enter password" />
                    </div>
                    <br></br>
                    <button type="button" className="btn btn-secondary btn-block" onClick={login}>Submit</button>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}