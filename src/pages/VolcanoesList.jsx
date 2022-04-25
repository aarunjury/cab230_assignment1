import React from "react";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Country from "../components/Countries"
import Volcanoes from "../components/Volcanoes"
import { useState } from "react";

export default function VolcanoesList() {
    const [selectedCountry, setCountry] = useState();

    return (
        <div className = "VolcanoesList">
            <Container>
                <Row>
                    <Col>
                        <Country setCountry={setCountry} />
                    </Col>
                </Row>
                <Row>
                    <Volcanoes country={selectedCountry} />
                </Row>
            </Container>
        </div>
    )
}