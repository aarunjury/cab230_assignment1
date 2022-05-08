import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Spinner from "react-bootstrap/esm/Spinner"

export default function Loading(){
    return(
        <Container>
            <Col>
                <Spinner animation="border" />
            </Col>
        </Container>
    )
}