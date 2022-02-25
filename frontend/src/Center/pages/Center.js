import React, { useState, useCallback, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import VaccineList from "../components/VaccineList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { url, port } from "../../Constant";
const CenterName = {
  id: "c1",
  center_name: "chittagong medical college",
};
const Vaccines = [
  {
    id: "v1",
    vaccine_name: "MODERNA",
    num_of_doses: "1223",
    centerId: "c1",
  },
  {
    id: "v2",
    vaccine_name: "ASTRAGENECA",
    num_of_doses: "2123",
    centerId: "c1",
  },
];

const Center = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [centerInfo, setCenterInfo] = useState();
  const auth = useContext(AuthContext);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (auth.uid && !auth.isPerson) {
          const responseData = await sendRequest(
            `http://${url}:${port}/api/center/${auth.uid}`
          );
          setCenterInfo(responseData.center);
        }
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest, auth.uid]);
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {(isLoading || !centerInfo) && <LoadingSpinner asOverlay />}
      {!isLoading && centerInfo && (
        <h1 className="center-name" align="center">
          {centerInfo[0].CENTER_NAME}
        </h1>
      )}
      {!isLoading && centerInfo && (
        <VaccineList items={centerInfo}></VaccineList>
      )}
    </React.Fragment>
  );
};

export default Center;
