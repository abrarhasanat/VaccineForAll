import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";
import "./PersonInfo.css";

const PersonInfo = (props) => {
  const auth = useContext(AuthContext);
  return (
    <Card className="person-item__content" align = "center">
      <div className="place-item__info">
        <h2>{"Name: " + props.items.NAME}</h2>
        <h3>{"Birth Cerficate No: " + props.items.BIRTH_CERTIFICATE_NO}</h3>
        <p> {"Present Address: " + props.items.PRESENT_ADDRESS}</p>
        <p> {"Permanent Address: " + props.items.PERMANENT_ADDRESS}</p>
        <h3>
          {"Date of Birth: " +
            new Date(props.items.DATE_OF_BIRTH).toLocaleDateString()}
        </h3>
      </div>
      <div className="place-item__actions">
        {auth.isLoggedIn && (
          <Button to={`/${auth.uid}/update`}>EDIT INFO</Button>
        )}
      </div>
    </Card>
  );
};

export default PersonInfo;
