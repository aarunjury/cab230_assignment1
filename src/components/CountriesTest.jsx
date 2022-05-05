
//best but formatting is whack
import { useCountries } from "../api";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner"
import { useState } from "react";

export default function Countries(props) {
  const { loading, countries, error } = useCountries();
  const [ innerSearch, setInnerSearch] = useState("");
  const [ country, setCountry] = useState();
  const [ popDistance, setPopDistance ] = useState();

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  //   onChange function adapted from 'gdh' @ https://stackoverflow.com/a/61862224
  return (
    <div className="country">
      {(() => {
      if (props.isAuth) {
        return (
          <div className="authNav">
          <br></br>
          <Row>
            <Col xs={7}>
            <h1>Volcanoes of the World</h1>
            <p>Use the drop-down menu to see all volcanoes in a given country. Optionally, 
            if you are registered and logged in, you can also use the "Populated Within" menu in conjunction with Country. 
            This will return the volcanoes that have people living within the specified radius of the volcano.
            </p>
            <p>Alternatively, you can try searching by typing the name of a country.</p>
            </Col>
          </Row>
          <hr></hr>
          <Row>
          <Col xs={3} className="d-flex justify-content-start align-self-center mr-2">
            <Form.Label >Country:</Form.Label>
            <Form.Select
              size="sm"
              label="Country:"
              onChange={(e) => {
                setCountry(e.target.value);
                setInnerSearch("")
                props.setSearch("")
              }}
            >
            <option>Choose a country from the list</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
            </Form.Select>
          </Col>
          <div className="authNavSection">
            <Col
              xs={2}
              className="d-flex justify-content-center align-self-center text-nowrap"
            >
            <Form.Label>Populated Within:</Form.Label>
            <Form.Select
              size="sm"
              label="Populated Within:"
              onChange={(e) => {
                setPopDistance(e.target.value);
              }}
            >
              <option value={null}>-</option>
              <option value={5}>5km</option>
              <option value={10}>10km</option>
              <option value={30}>30km</option>
              <option value={100}>100km</option>
            </Form.Select>
            </Col>
            <Col xs={2} className="col-3 d-flex align-self-center">
              <Button
                size="sm"
                className="float-sm-end"
                variant="secondary"
                type="submit"
                onClick={() => {
                  props.setCountry(country);
                  props.setPopDistance(popDistance);
                }}
              >
                Go
              </Button>
            </Col>
            <Col className="d-flex justify-content-end align-self-center"> 
            <Form className="d-flex">
              <FormControl
                type="search"
                name="search"
                id="search"
                placeholder="Search by country"
                className="me-2"
                aria-label="Search"
                value={innerSearch}
                onChange={(e) => setInnerSearch(e.target.value)}
              />
              <Button
                size="sm"
                className="float-sm-end"
                variant="secondary"
                onClick={() => props.setSearch(innerSearch)}
              >
                Search
              </Button>
            </Form>
          </Col>   
        </div>
        </Row>
      </div>
        );
      } 
      else {
        return (
          <div className="nonAuthNavSection">
          <br></br>
          <Row>
            <Col xs={7}>
            <h1>Volcanoes of the World</h1>
            <p>Use the drop-down menu to see all volcanoes in a given country. Optionally, 
            if you are registered and logged in, you can also use the "Populated Within" menu in conjunction with Country. 
            This will return the volcanoes that have people living within the specified radius of the volcano.
            </p>
            <p>Alternatively, you can try searching by typing the name of a country.</p>
            </Col>
          </Row>
          <hr></hr>
          <Row>
            <Col xs={3} className="d-flex justify-content-start align-self-center mr-2">
              <Form.Label >Country:</Form.Label>
              <Form.Select
                size="sm"
                label="Country:"
                onChange={(e) => {
                  setCountry(e.target.value);
                  setInnerSearch("")
                  props.setSearch("")
                }}
              >
                <option>Choose a country from the list</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col className="d-flex justify-content-end align-self-center"> 
              <Form className="d-flex">
                <FormControl
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Search by country"
                  className="me-2"
                  aria-label="Search"
                  value={innerSearch}
                  onChange={(e) => setInnerSearch(e.target.value)}
                />
                <Button
                  size="sm"
                  className="float-sm-end"
                  variant="secondary"
                  onClick={() => props.setSearch(innerSearch)}
                >
                  Search
                </Button>
              </Form>
            </Col>   
            <Col xs={9}>
              <Button
              size="sm"
              className="float-sm-end"
              variant="secondary"
              type="submit"
              onClick={() => {
                props.setCountry(country);
              }}
              >
              Search
              </Button>
            </Col>
          </Row>
        </div>
        );
      }
      })()}
    </div>
  );
}
