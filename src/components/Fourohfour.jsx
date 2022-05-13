import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Loading from "./Loading"

export default function Fourohfour(){
    return(
        <Container>
            <Row>
                <Col>
                    <h1>Oh no! Something went wrong. Return to the home page and try again.</h1>
                </Col>
            </Row>
            <Row>
                <Loading />
            </Row>
        </Container>
    )
}