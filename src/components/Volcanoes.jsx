import { useVolcanoesByCountry } from "../api";
import { useVolcanoesByCountryPop } from "../api";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading"
import React, { useCallback, useMemo, useRef, useEffect, useState } from "react";

export default function Volcanoes(props) {
  //how to only call one or the other, depending on the presence of props.popDistance?
  // if (props.country){
  //   const { loading, volcanoes, error } = useVolcanoesByCountry(props.country);
  // }
  // else if (props.country && props.popDistance){
  //   const { loading, volcanoes, error } = useVolcanoesByCountryPop(props.country, props.popDistance);
  // }
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

  if (loading || loading2) {
    return <Loading />;
  }

  if (error || error2) {
    return <p>Something went wrong: {error.message}</p>;
  }

  return (
    <div
      key={props.country}
      className="ag-theme-alpine-dark"
      style={{ width: "100%", height: "495px" }}
    >
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
    </div>
  );
}
