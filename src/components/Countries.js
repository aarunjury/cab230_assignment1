import { useCountries } from "../api";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";

export default function Countries({ setCountry }) {
  const { loading, countries, error } = useCountries();
  let countryInput = "";

  function setCountryInput(val) {
    countryInput = val;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something fucked up: {error.message}</p>;
  }

  //   onChange function adapted from 'gdh' @ https://stackoverflow.com/a/61862224
  return (
    <div className="Countries">
      <br></br>
      <Row>
        <Col xs={1} className="d-flex justify-content-center align-self-center">
          <h6>Country:</h6>
        </Col>
        <Col xs={3}>
          <Form.Select
            size="sm"
            onChange={(e) => {
              setCountryInput(e.target.value);
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
        <Col xs={2} className="d-flex justify-content-center align-self-center">
          <h6>Populated Within:</h6>
        </Col>
        <Col xs={2} className="d-flex justify-content-center align-self-center">
          <Form.Select size="sm">
            <option>5km</option>
            <option>10km</option>
            <option>30km</option>
            <option>100km</option>
          </Form.Select>
        </Col>
        <Col xs={4}>
          <Button
            size="sm"
            className="float-sm-end"
            variant="secondary"
            type="submit"
            onClick={(e) => {
              setCountry(countryInput);
            }}
          >
            Search
          </Button>
        </Col>
      </Row>
      <br></br>
    </div>
  );
}
