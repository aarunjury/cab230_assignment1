import { useState } from "react";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useNavigate } from "react-router-dom";

const API_URL = "http://sefdb02.qut.edu.au:3001"

export default function Register(props){
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const navigate = useNavigate();

    if (props.isAuth){
        navigate("/volcanoeslist")
    }

    function register(){
        const url = `${API_URL}/user/register`

        return fetch(url, {
            method: "POST",
            headers: { accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({email, password})
        })
        .then(res => res.json())
    }

    return(
        <Container>
            <Row className="justify-content-center">
                <Col xs={4}>
                    <br></br>
                    <form className="shadow p-2 bg-white rounded" onSubmit={(event) =>{
                        event.preventDefault();
                    }}>
                    <h3>Sign Up</h3>
                    <div className="form-group">
                        <label htmlFor="email">Email Address:</label>
                        <input type="email" name="email" id="email" value={email} onChange={(event) => {setEmail(event.target.value)}} className="form-control" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password" value={password} onChange={(event) => {setPassword(event.target.value)}} className="form-control" placeholder="Enter password" />
                    </div>
                    <br></br>
                    <button type="submit" className="btn btn-secondary btn-block" onClick={register}>Submit</button>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}