import React, { useState, useCallback, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import VaccineInfoList from "../components/VaccineInfoList";
import PersonInfo from "../components/PersonInfo";
import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";
import "./PersonAuth.css";

import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { url, port } from "../../Constant";
const PERSON = {
  id: "u1",
  birth_certificate_no: "20141233242312342",
  name: "Abrar Hasnat",
  address: "Titumir Hall",
  date_of_birth: "01-APR-2000",
};
const VaccInfo = [
  {
    id: "moderna",
    vaccine_name: "moderna",
    vaccinator_name: "zarzees",
    vaccination_date: new Date(2018, 11, 24),
    center_name: "chittagong medical college",
  },

  {
    id: "moderna",
    vaccine_name: "moderna",
    vaccinator_name: "hasnat",
    vaccination_date: new Date(2018, 12, 27),
    center_name: "chittagong medical college",
  },
];

const Person = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [personInfo, setPersonInfo] = useState();
  const [vaccinationInfo, setVaccinationInfo] = useState();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (auth.uid && auth.isPerson) {
          console.log("hei ami ekhane " + auth.uid);
          let responseData = await sendRequest(
            `http://${url}:${port}/api/person/${auth.uid}/getPersonInfo`
          );
          console.log("data output dicchi");
          console.log(responseData.person_info);
          setPersonInfo(responseData.person_info);
          setVaccinationInfo(responseData.vaccination_info);
        }
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest, auth.uid, auth.isPerson]);

  const certificateDownloader = (event) => {
    console.log("downlaoding certificaet");
    window.print();
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {(isLoading || !personInfo || !vaccinationInfo) && (
        <LoadingSpinner asOverlay />
      )}
      {!isLoading && personInfo && <PersonInfo items={personInfo} />}
      <marquee>
        {" "}
        <h2>Plese Go to Update Info to select or change Center Name</h2>
      </marquee>
      {!isLoading && vaccinationInfo && (
        <VaccineInfoList items={vaccinationInfo} />
      )}
      {!isLoading && !vaccinationInfo && (
        <h1 className="headingStyle">NO VACCINATION INFO FOUND</h1>
      )}
      {!isLoading && vaccinationInfo && (
        <Button>DOWNLOAD CERTIFICATE</Button>
      )}
    </React.Fragment>
  );
};

export default Person;
