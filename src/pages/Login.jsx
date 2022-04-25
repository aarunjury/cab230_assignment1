import React, { useState, useContext } from "react";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/contexts/AuthContext";

const API_URL = "http://sefdb02.qut.edu.au:3001"

export default function Login({ setIsAuth }){
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);

    function login(){
        const url = `${API_URL}/user/login`;

        return fetch(url, {
            method: "POST",
            headers: { accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({email, password}),
        })
        .then(res => res.json()
        .then(res => {
            localStorage.setItem("token", res.token)}))
        .then(setIsAuth(true))
        .then(setAuth(true))
        // .then(res => console.log(res))
        // .then(res => console.log(res.json()))
        // .then(res => console.log(res.token))
        // .then(res => {localStorage.setItem("token", res.token)})
        // .then(res => {setUtoken(res)})
        // .then(res => {console.log(res)})
        // .then(setUtoken(localStorage.getItem("token")))
        // .then(setUtoken("localStorage.getItem"))
        // .then(setUtoken("localStorage.getItem")) //This one works/is hacky
        // .then(console.log("login setting token: " + localStorage.getItem("token")))
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
                        <input type="email" name="email" id="email" value={email} onChange={(event) => {setEmail(event.target.value)}} className="form-control" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password" value={password} onChange={(event) => {setPassword(event.target.value)}} className="form-control" placeholder="Enter password" />
                    </div>
                    <br></br>
                    <button type="button" className="btn btn-secondary btn-block" onClick={(event) => {login()}}>Submit</button>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}