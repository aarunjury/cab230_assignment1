import React, { useState } from "react";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Alert from "react-bootstrap/Alert"
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading"

const API_URL = "http://sefdb02.qut.edu.au:3001"

export default function Login(props){
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ userCreated, setUserCreated] = useState(null);
    const navigate = useNavigate();
    let urlSuffix = ''
    let loggingIn  = null;

    if (loading) {
        return <Loading />
    }

    if (props.heading === "Sign In"){
        urlSuffix = 'login'
        loggingIn = true
    }
    else {
        urlSuffix = 'register'
        loggingIn = false
    }

    function auth(event){
        const url = `${API_URL}/user/${urlSuffix}`;
        event.preventDefault();
        setLoading(true);
        return fetch(url, {
            method: "POST",
            headers: { accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({email, password}),
        })
        .then(res => {
        if (!res.ok){
            if (res.status === 400){
                throw Error("Both email and password are required fields")
            }
            else if (res.status === 401){
                throw Error("Incorrect email address or password was provided!")
            }
            else if (res.status === 409){
                throw Error("Couldn't create user")
            }
        }
            return res.json();
        })
        .then(data => {
            setLoading(false);
            setError(null);
            //If we're registering, don't want to set token and isAuth
            if (loggingIn){
                setUserCreated("Logging you in...")
                setLoading(true)
                localStorage.setItem("token", data.token)
                console.log(data.token)
                props.setIsAuth(true)
                setTimeout(() => {
                    setUserCreated(null)
                    setLoading(false)
                    navigate("/")
                },1000);
            } 
            else {
                setUserCreated("User created successfully, taking you to login...")
                setLoading(true)
                setTimeout(() => {
                    setUserCreated(null)
                    setLoading(false)
                    navigate("/login")
                },3000);
            }
        })
        .catch(err => {
            // Clear error after 4 seconds so the error message
            // does not persist between screens
            setLoading(false);
            setError(err);
            setTimeout(() => {
                setError(null);
            },4000); 
            console.log(err);
        })
        .finally(() => {
            setLoading(false);
        })
    }

    return(
        <Container>
        <Row className="justify-content-center">
            <Col xs={4}>
                <br></br>
                <div className="shadow p-2 bg-white rounded">
                    <Row>
                        <h3>{props.heading}</h3>
                        {error && <Alert variant={'danger'}>{error.message}</Alert>}
                        {userCreated && <Alert variant={'success'}>{userCreated}</Alert>}
                        {userCreated && <Loading />}
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
                                    <Button className="float-end" variant="secondary" type="submit" onClick={(e) => {auth(e)}}>
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