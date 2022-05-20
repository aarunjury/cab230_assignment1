import { useVolcanoesByCountry } from "../api";
import { useVolcanoesByCountryPop } from "../api";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading"
import React, { useCallback, useMemo, useRef, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert"

// This component is the lower half of the VolcanoesList page and contains the AgGrid
// table and fetches the appropriate array of volcanoes according to the search params
export default function Volcanoes(props) {
  // Would be good to conditionally call ByCountry or ByCountryPop, not both by default
  const { loading, volcanoes, error } = useVolcanoesByCountry(props.country);
  const { loading2, volcanoesPop, error2 } = useVolcanoesByCountryPop(props.country, props.popDistance);
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const navigate = useNavigate();
  const gridRef = useRef();
  const [filteredVolcanoes, setFilteredVolcanoes] = useState();
  const onFirstDataRendered = useCallback((params) => {
    gridRef.current.api.sizeColumnsToFit();
  }, []);

  // If the user does choose a populated radius
  // set the array of volcanoes accordingly
  useEffect(() => {
    if (props.popDistance) {
      setFilteredVolcanoes(volcanoesPop);
    } else {
      setFilteredVolcanoes(volcanoes);
    }
  }, [filteredVolcanoes, props.popDistance, volcanoes, volcanoesPop]);

  const table = {
    columns: [
      { headerName: "ID", field: "id", sortable: true },
      { headerName: "Volcano Name", field: "name", filter: true, filterParams: {
        filterOptions: ['contains', 'startsWith', 'endsWith'],
        defaultOption: 'startsWith',
      } },
      { headerName: "Region", field: "region", filter: true, filterParams: {
        filterOptions: ['contains', 'startsWith', 'endsWith'],
        defaultOption: 'startsWith',
      } },
      { headerName: "Sub-Region", field: "subregion", filter: true, filterParams: {
        filterOptions: ['contains', 'startsWith', 'endsWith'],
        defaultOption: 'startsWith',
      } },
    ],
  };


  return (
    <div
      key={props.country}
      className="ag-theme-alpine-dark"
      style={{ width: "100%", height: "495px" }}
    >
      <Row>
        {(loading || loading2) && 
          <Loading />
        }
        {(error || error2) && <Alert variant={'danger'}>{error.message}</Alert>}
      </Row>
      <Row>
        <div style={containerStyle}>
          <div id="grid-wrapper" style={{ width: "100%", height: "100%" }}>
            <div style={gridStyle} className="ag-theme-alpine-dark">
              <AgGridReact
                ref={gridRef}
                key={props.country}
                columnDefs={table.columns}
                rowData={filteredVolcanoes}
                pagination={true}
                paginationPageSize={9}
                onRowClicked={(row) => navigate(`/volcano?id=${row.data.id}`)}
                onFirstDataRendered={onFirstDataRendered}
              />
            </div>
          </div>
        </div>
    </Row>
    </div>
  );
}
