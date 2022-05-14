import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import HeroImage from "../img/heroVolcano.jpg"
import { Link } from "react-router-dom";

// Component for the Home page
export default function Home(){
    return(
        <div className="HomePageContents">
        <br></br>
        <Container>
          <Row>
            <Col>
            <Row>
            <h1>
                Welcome to <br></br> Volcanoes of the World!
              </h1>
            </Row>
            <Row>
              <p>Prepare to be amazed and enthralled by 
                learning about 1,343 volcanoes from all around planet Earth. You can learn about
                what region and sub-region a volcano resides in, as well as when it last erupted,
                the height from base to summit and how high above (or below) sea level
                a volcano exists.
              </p>
              <p>
                If you register with Volcanoes of the World, you'll also be able to access information
                about the number of people living within a given radius of a volcano. Additionally,
                you'll get to see a really cool pie chart of that same information! What are you waiting for?! 
                <br></br>Click <Link to="/register">here</Link> to get started.
              </p>
            </Row>
            </Col>
            <Col>
              <Image
                className="shadow p-1 bg-white float-end"
                fluid="true"
                rounded="true"
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