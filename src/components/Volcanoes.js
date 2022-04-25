import { useVolcanoesByCountry } from "../api";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import React, { useCallback, useMemo, useRef } from "react";

export default function Volcanoes(props) {
  const { loading, volcanoes, error } = useVolcanoesByCountry(props.country);
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const navigate = useNavigate();
  const gridRef = useRef();

  const onFirstDataRendered = useCallback((params) => {
    gridRef.current.api.sizeColumnsToFit();
  }, []);

  const table = {
    columns: [
      { headerName: "ID", field: "id" },
      { headerName: "Volcano Name", field: "name" },
      { headerName: "Region", field: "region" },
      { headerName: "Sub-Region", field: "subregion" },
    ],
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something fucked up: {error.message}</p>;
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
              rowData={volcanoes}
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
