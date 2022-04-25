import React from "react";
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Image from "react-bootstrap/Image"
import HeroImage from "../img/heroVolcano.jpg"

export default function Home(){
    return(
        <div className="HomePage">
        <br></br>
        <Container>
          <Row>
            <Col>
              <h1>
                Welcome to <br></br> Volcanoes of the World!
              </h1>
            </Col>
            <Col>
              <Image
                className="shadow p-1 mb-5 bg-white rounded"
                fluid="true"
                width="600"
                height="400"
                alt=""
                src={HeroImage}
              />
            </Col>
          </Row>
        </Container>
        </div>
    );
}