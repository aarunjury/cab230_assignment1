import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Countries from "../components/Countries"
import Volcanoes from "../components/Volcanoes"
import { useState } from "react";
import { useEffect } from "react"

export default function VolcanoesList(props) {
    const [selectedCountry, setCountry] = useState();
    const [popDistance, setPopDistance] = useState();

    useEffect(() => {
        if (props.searchQuery){
            setCountry(props.searchQuery);
        }
    },[props.searchQuery, selectedCountry])

    return (
        <div className = "VolcanoesList">
            <Container>
                <Row>
                    <Col>
                        <Countries setSearch={props.setSearch} isAuth={props.isAuth} country={selectedCountry} setCountry={setCountry}
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