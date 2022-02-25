import React from "react";

import Card from "../../shared/components/UIElements/Card";
import Vaccine from "./Vaccine";
import Button from "../../shared/components/FormElements/Button";
import "./VaccineList.css";

const VaccineList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No Vaccine Information is found</h2>
          <Button to="/places/new">Add Vaccine?</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map((vaccine) => (
        <Vaccine
          key={vaccine.VACCINE_NAME}
          id={vaccine.VACCINE_NAME}
          title={vaccine.VACCINE_NAME}
          description={Number(vaccine.AVAILABLE_DOSES)}
        />
      ))}
  
    </ul>
  );
};

export default VaccineList;
