import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";
import "./VaccineInfo.css";

const PlaceItem = (props) => {
  return (
    <React.Fragment>
      <hr className="dashed_line"></hr>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__info">
            <h2>{props.vaccine_name}</h2>
            <h2>{props.dose_no}</h2>
            <h2>{props.vaccination_date}</h2>
            <h2>{props.center_name}</h2>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
