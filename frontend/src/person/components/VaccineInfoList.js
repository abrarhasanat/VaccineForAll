import React from "react";

import Card from "../../shared/components/UIElements/Card";
import VaccineInfo from "./VaccineInfo";
import Button from "../../shared/components/FormElements/Button";
import "./VaccineInfoList.css";

const VaccineInfoList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No Vaccination Info Found</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <h1 align="center"> VACCINATION INFORMATION</h1>
      <hr className="line" />
      <ul className="place-list">
        {props.items.map((info) => (
          <VaccineInfo
            //key={new Date().getTime()}
            //id={info.VACCINE_NAME}
            vaccine_name={" Vaccine Name: " + info.VACCINE_NAME}
            vaccination_date={"Vaccination Date: " + new Date(info.VACCINATION_DATE).toLocaleDateString()}
            dose_no={"Dose No: " + info.DOSE_NO}
            center_name={"Center: " + info.CENTER_NAME}
          />
        ))}
      </ul>
    </React.Fragment>
  );
};

export default VaccineInfoList;
