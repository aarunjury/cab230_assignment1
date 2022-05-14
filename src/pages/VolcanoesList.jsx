import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Countries from "../components/Countries"
import Volcanoes from "../components/Volcanoes"
import { useState } from "react";

// Component for the page that renders the table of volcanoes matching search query
export default function VolcanoesList(props) {
    const [selectedCountry, setCountry] = useState();
    const [popDistance, setPopDistance] = useState();

    return (
        <div className = "VolcanoesList">
            <Container>
                <Row>
                    <Col>
                        <Countries isLoggedIn={props.isLoggedIn} country={selectedCountry} setCountry={setCountry}
                         popDistance={popDistance} setPopDistance={setPopDistance} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Volcanoes popDistance={popDistance} country={selectedCountry} />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}