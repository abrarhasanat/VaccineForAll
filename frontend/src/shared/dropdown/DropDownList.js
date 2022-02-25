import React from "react";

import Card from "../components/UIElements/Card";
import Button from "../components/FormElements/Button";
import "./VaccineInfoList.css";
const countries = [
  { id: "AFG", name: "Afghanistan" },
  { id: "ALA", name: "Aland Islands" },
  { id: "ALB", name: "Albania" },
];
const DropDownList = (props) => {
  return (
    <React.Fragment>
      <h1 align="center"> VACCINATION INFORAMATION</h1>
      <hr className="line" />
      <select className="">
        {countries.map((c) => {
          return (
            <option key={c.id} value={c.id} >
              {c.name}
            </option>
          );
        })}
      </select>
    </React.Fragment>
  );
};

export default DropDownList;
