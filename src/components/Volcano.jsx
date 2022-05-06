import { useVolcanoesById } from "../api";
import Loading from "../components/Loading"
import { Map, Marker } from "pigeon-maps";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import React from "react";

export default function Volcano(props) {
  const { loading, volcano, error } = useVolcanoesById(props.id);
  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: ["Red - 5km", "Orange - 10km", "Yellow - 30km", "Purple - 100km"],
    datasets: [
      {
        label: "# of people",
        data: [
          volcano.population_5km,
          volcano.population_10km,
          volcano.population_30km,
          volcano.population_100km,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderWidth: 3,
      },
    ],
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Something went wrong: {error.message}</p>; //useNavigate to 404 page?
  }

  return (
    <div>
      <div className="VolcanoesById shadow p-3 mb-5 bg-white rounded">
        <Container>
          <Row>
            <Col sm={6} xs={12}>
              <h1 className="VolcanoTitle">{volcano.name}</h1>
              <ul>
                <li>
                  <strong>Country: </strong>
                  {volcano.country}
                </li>
                <li>
                  <strong>Region: </strong>
                  {volcano.region}
                </li>
                <li>
                  <strong>Subregion: </strong>
                  {volcano.subregion}
                </li>
                <li>
                  <strong>Last Eruption: </strong>
                  {volcano.last_eruption}
                </li>
                <li>
                  <strong>Summit: </strong>
                  {volcano.summit.toLocaleString()} m
                </li>
                <li>
                  <strong>Elevation: </strong>
                  {volcano.elevation.toLocaleString()} ft
                </li>
                <li>
                  <strong>Wiki: </strong>
                  <a href={"https://en.wikipedia.org/wiki/" + volcano.name}>
                    Wiki Article
                  </a>
                </li>
              </ul>
            </Col>
            <Col className="justify-content-center" sm={6} xs={12}>
              <Map
                defaultCenter={[
                  parseFloat(volcano.latitude),
                  parseFloat(volcano.longitude),
                ]}
                defaultZoom={5}
              >
                <Marker
                  color={"brown"}
                  width={25}
                  anchor={[
                    parseFloat(volcano.latitude),
                    parseFloat(volcano.longitude),
                  ]}
                />
              </Map>
            </Col>
          </Row>
        </Container>
      </div>
      {props.isAuth && (
        <div className="popChart shadow p-3 mb-5 bg-white rounded">
          <Row>
            <Col>
              <p>
                Pie chart depicting the number of people living within the given
                radius of {volcano.name}
              </p>
            </Col>
            <Col>
              <Pie
                height={"300"}
                data={data}
                options={{ maintainAspectRatio: false }}
              />
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}
