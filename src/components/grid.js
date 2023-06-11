import React from "react";
import { Card } from "@mui/material";

const Grid = ({
  grid,
  handleGridSize,
  inputCells,
  setCells,
  inputRows,
  setRows,
  setvalues,
  calculateScore,
  bestHouse,
  bestHousecoord,
  houses,
  Gyms,
  Restaurents,
  hospitals,
  checkbuild
}) => {
  const cells = new Array(grid.cells).fill(0);
  const rows = new Array(grid.rows).fill(0);

  //Box Component
  const Box = (props) => {
    let res1 = houses.find((item) => item.cellNum === props.cellNum);
    let res2 = Gyms.find((item) => item.cellNum === props.cellNum);
    let res3 = Restaurents.find((item) => item.cellNum === props.cellNum);
    let res4 = hospitals.find((item) => item.cellNum === props.cellNum);

    return (
      <div
        style={
          bestHousecoord.cellNum != undefined &&
          bestHousecoord.cellNum === props.cellNum
            ? {
                height: "100px",
                width: "150px",
                border: "1px solid black",
                backgroundColor: "red",
                textAlign: "center"
              }
            : {
                height: "100px",
                width: "150px",
                border: "1px  black",
                borderStyle: "double",
                textAlign: "center"
              }
        }
      >
        <h3>{props.cellNum}</h3>
        {houses.length > 0 &&
        res1 != undefined &&
        res2 === undefined &&
        res3 === undefined &&
        res4 === undefined ? (
          <p>House {houses.length}</p>
        ) : (
          ""
        )}
        {Gyms.length > 0 && res2 != undefined && res1 === undefined ? (
          <p style={{ marginBottom: "0px", marginTop: "0px" }}>
            Gym {Gyms.length}
          </p>
        ) : (
          ""
        )}
        {Restaurents.length > 0 && res3 != undefined && res1 === undefined ? (
          <p style={{ marginBottom: "0px", marginTop: "0px" }}>
            Restaurent {Restaurents.length}
          </p>
        ) : (
          ""
        )}
        {hospitals.length > 0 && res4 != undefined && res1 === undefined ? (
          <p style={{ marginBottom: "0px", marginTop: "0px" }}>
            Hospital {hospitals.length}
          </p>
        ) : (
          ""
        )}
      </div>
    );
  };

  //Column Component

  const Column = (props) => {
    return rows.map((val, index) => {
      let cellNum = inputCells * index + (props.columnNum + 1);
      return <Box key={index} cellNum={cellNum} />;
    });
  };

  // Grid Component
  const gridd = cells.map((val, index) => {
    return (
      <div>
        <Column key={index} columnNum={index} />
      </div>
    );
  });

  // const width = 102 * inputCells;
  // console.log(width);

  return (
    <main>
      <div className="container">
        <div className="left">
          <Card style={{ maxWidth: 450, marginLeft: "5px" }}>
            <h1 style={{ marginLeft: "5px" }}>Instructions:</h1>
            <div style={{ display: "inline-block", marginLeft: "5px" }}>
              <p>1) Enter Values in Input Box.</p>
              <p>2) Values in Layout Dimensions must be greater than 0</p>
              <p>
                3) Values in Layout Designmust be among the cell values on Grid.
              </p>
              <p>4) Values must be comma separated.</p>
              <p>
                5) Houses can not be on the same cell as Gym , Restaurent,
                Hospital.
              </p>
            </div>
          </Card>
          <Card style={{ maxWidth: 450, marginLeft: "5px", marginTop: "10px" }}>
            <div style={{ marginLeft: "10px" }}>
              <h1>Layout Dimensions</h1>
              <div>
                <label htmlFor="cells">Colunms</label>
                <input
                  type="text"
                  placeholder="Define cells in the row"
                  id="cells"
                  value={inputCells}
                  onChange={(e) => setCells(e.target.value)}
                  // style={{ marginRight: "20px" }}
                />
              </div>
              <div>
                <label htmlFor="rows">Rows</label>
                <input
                  type="text"
                  placeholder="Define rows"
                  id="rows"
                  value={inputRows}
                  onChange={(e) => setRows(e.target.value)}
                  style={{ marginLeft: "29px" }}
                />
              </div>

              <button onClick={handleGridSize}>Change Grid</button>
            </div>
          </Card>
          <Card style={{ maxWidth: 450, marginLeft: "5px", marginTop: "10px" }}>
            <div style={{ marginLeft: "10px" }}>
              <h1>Layout Design</h1>
              <div>
                <label htmlFor="cells"> House: </label>
                <input
                  type="text"
                  placeholder="Enter Comma separated list "
                  onChange={(e) => {
                    setvalues(e, "HOUSE");
                  }}
                  style={{ marginLeft: "49px" }}
                />
              </div>

              <div>
                <label htmlFor="cells">Gyms:</label>
                <input
                  type="text"
                  placeholder="Enter Comma separated list"
                  onChange={(e) => {
                    setvalues(e, "GYM");
                  }}
                  style={{ marginLeft: "60px" }}
                />
              </div>

              <div>
                <label htmlFor="cells"> Restaurents: </label>
                <input
                  type="text"
                  placeholder="Enter Comma separated list "
                  onChange={(e) => {
                    setvalues(e, "RESTAURENT");
                  }}
                />
              </div>

              <div>
                <label htmlFor="cells"> Hospitals </label>
                <input
                  type="text"
                  placeholder="Enter Comma separated list "
                  onChange={(e) => {
                    setvalues(e, "HOSPITAL");
                  }}
                  style={{ marginLeft: "32px" }}
                />
              </div>
            </div>
            <button onClick={calculateScore}> Get Best House</button>
            {checkbuild === -1 ? (
              <p style={{ marginLeft: "10px", fontSize: "20px" }}>
                Values in House should Not be same as Gym, Hospital, Restaurent
              </p>
            ) : (
              <p style={{ marginLeft: "10px", fontSize: "20px" }}>
                Best House is at Cell {bestHousecoord.cellNum}
              </p>
            )}
          </Card>
        </div>

        <div
          className="right"
          style={{ justifyItems: "center", display: "inline-grid" }}
        >
          <h1 style={{ textAlign: "center" }}>Housing Layout</h1>

          <div
            style={{
              display: "inline-flex",
              // flexWrap: "wrap",
              overflowX: "auto"
              // width: `${width}px`
            }}
          >
            {gridd}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Grid;
