import { useCountries } from "../api";
import Loading from "../components/Loading"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Select from 'react-select'

// Function which holds a single row on the VolcanoesList page
// containing the 'Country' dropdown/search component, 'populated within'
// and search button
export default function Countries(props) {
  const { loading, countries, error } = useCountries();
  const [ country, setCountry] = useState();
  const [ popDistance, setPopDistance ] = useState();
  //React-select options expects an array of objects with
  //value-label pairs so this function does that
  const countryOptions = countries.map((volcano) => {
    return {
        value: volcano,
        label: volcano
      }
    }
  );

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  return (
    <div className="Countries">
      <br></br>
      <Row>
        <Col xs={7}>
        <h1>Volcanoes of the World</h1>
        <p>You can begin by either typing the name of a country in, or selecting one from the drop-down menu 
        to see all the volcanoes in a given country. Optionally, if you are registered and 
        logged in, you can also use the "Populated Within" menu in conjunction with Country. 
        This will return the volcanoes that have people living within the specified radius of the volcano.
        </p>
        </Col>
      </Row>
      <hr></hr>
      <Row>
        <Col xs={3}>
          <Select label="Country:" placeholder="Choose a country"options={countryOptions}
          onChange={(e) => {
              setCountry(e.value);
            }} />
        </Col>

        {/* Content conditional on props.isLoggedIn being false follows */}

        {!props.isLoggedIn && (
          <Col xs={3} className="d-flex justify-content-start align-self-center mr-2">
            <Button
              className="float-sm-end"
              variant="secondary"
              type="submit"
              onClick={() => {
                props.setCountry(country);
              }}
            >
              Go
            </Button>
          </Col>
        )}

        {/* Content conditional on props.isLoggedIn being true follows */}

        {props.isLoggedIn && (
          <Col
            xs={3}
            className="d-flex justify-content-center align-self-center text-nowrap"
          >
            <Form.Label className="d-flex justify-content-center align-self-center text-nowrap">Populated Within:</Form.Label>
            <Form.Select
              label="Populated Within:"
              onChange={(e) => {
                setPopDistance(e.target.value);
              }}
            >
              <option value={""}>-</option>
              <option value={5}>5km</option>
              <option value={10}>10km</option>
              <option value={30}>30km</option>
              <option value={100}>100km</option>
            </Form.Select>
          </Col>
        )}
        {props.isLoggedIn && (
          <Col xs={2} className="d-flex align-self-center">
            <Button
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
        )}
      </Row>
      <br></br>
    </div>
  );
}
