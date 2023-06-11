import React, { useEffect, useState } from "react";
import "./styles.css";
import Grid from "./components/grid";

export default function App() {
  const gridBase = {
    cells: 5,
    rows: 5
  };

  const [grid, setGrid] = useState(gridBase);
  const [inputCells, setCells] = useState(grid.cells);
  const [inputRows, setRows] = useState(grid.rows);

  //Handle the dimension of Layout on click of Change Grid buttonn
  const handleGridSize = () => {
    const res = {
      cells: parseInt(inputCells),
      rows: parseInt(inputRows)
    };
    setGrid({ ...res });
  };

  const [houses, setHouses] = useState([]);
  const [Gyms, setGyms] = useState([]);
  const [Restaurents, setRestaurents] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [bestHouse, setBestHouse] = useState(0);
  const [bestHousecoord, setBestHousecoord] = useState({});
  const [checkbuild, setcheckbuilds] = useState(1);

  //Function Set values of House Gym Resturent Hospital Array
  const setvalues = (e, dest) => {
    let arr1 = e.target.value.split(",");
    let arr = [],
      nums = [];
    arr1.map((item) => {
      let num = parseInt(item);
      let isNAN = isNaN(num);
      if (!isNAN && num <= inputCells * inputRows) {
        const obj = {
          x: Math.floor((num - 1) / inputRows),
          y: (num - 1) % inputCells,
          cellNum: num
        };
        if (nums.indexOf(num) === -1) {
          arr.push(obj);
          nums.push(num);
        }
      }
    });

    if (dest === "HOUSE") {
      setHouses(arr);
    }

    if (dest === "GYM") {
      setGyms(arr);
    }

    if (dest === "RESTAURENT") {
      setRestaurents(arr);
    }

    if (dest === "HOSPITAL") {
      setHospitals(arr);
    }
  };

  //Function to calculate the best house suitable
  const calculateScore = () => {
    let maximumScore = Infinity;
    let winHouse;
    return houses.map((item) => {
      let maximum = 0;
      let res2 = Gyms.find((item1) => item1.cellNum === item.cellNum);
      let res3 = Restaurents.find((item2) => item2.cellNum === item.cellNum);
      let res4 = hospitals.find((item3) => item3.cellNum === item.cellNum);
      if (res2 != undefined || res3 != undefined || res4 != undefined) {
        setcheckbuilds(-1);
        return -1;
      }

      Gyms.map((a) => {
        let b = Math.abs(item.x - a.x) + Math.abs(item.y - a.y);
        maximum = b;
      });
      Restaurents.map((a) => {
        let b = Math.abs(item.x - a.x) + Math.abs(item.y - a.y);
        maximum += b;
      });
      hospitals.map((a) => {
        let b = Math.abs(item.x - a.x) + Math.abs(item.y - a.y);
        maximum += b;
      });
      if (maximumScore > maximum) {
        maximumScore = maximum;
        winHouse = item;
      }
      setBestHouse(maximumScore);
      setBestHousecoord(winHouse);
    });
  };

  return (
    <div className="app">
      <h1 style={{ textAlign: "center" }}>
        UI System to predict Best House in Housing Layout
      </h1>
      <div>
        {inputCells === 0 || inputRows === 0 ? (
          <h1>Grid Columns or rows can't be zero</h1>
        ) : (
          <Grid
            grid={grid}
            handleGridSize={handleGridSize}
            inputCells={inputCells}
            inputRows={inputRows}
            setCells={setCells}
            setRows={setRows}
            houses={houses}
            setvalues={setvalues}
            calculateScore={calculateScore}
            Gyms={Gyms}
            Restaurents={Restaurents}
            hospitals={hospitals}
            bestHouse={bestHouse}
            bestHousecoord={bestHousecoord}
            checkbuild={checkbuild}
          />
        )}
      </div>
    </div>
  );
}
