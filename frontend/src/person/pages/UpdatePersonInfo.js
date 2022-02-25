import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "../../places/pages/PlaceForm.css";
import { url, port } from "../../Constant";
const TestData = [
  {
    DIVISION: "hello",
  },
  {
    DIVISION: "kire",
  },
];
const UpdatePersonInfo = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState();
  const placeId = useParams().placeId;
  const history = useHistory();
  const [personInfo, setPersonInfo] = useState();
  const [divisions, setDivisions] = useState();
  const [districts, setDistricts] = useState();
  const [thanas, setThanas] = useState();
  const [centers, setCenters] = useState();
  const [centerId, setCenterId] = useState();
  const [division, setDivision] = useState();
  const [district, setDistrict] = useState();
  const [thana, setThana] = useState();
  const [centerName, setCenterName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const personId = useParams().person_id;
  useEffect(() => {
    const fetchPlace = async () => {
      try {
        if (division) {
          let responseData = await sendRequest(
            `http://${url}:${port}/api/person/getDistrictByDivision`,
            "POST",
            JSON.stringify({
              division: division,
            }),
            {
              "Content-Type": "application/json",
            }
          );
          console.log("districts loaded");
          console.log(responseData.district_list);
          setDistricts(responseData.district_list);
        }
      } catch (err) {}
    };
    fetchPlace();
  }, [division]);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        if (district) {
          let responseData = await sendRequest(
            `http://${url}:${port}/api/person/getThanaByDistrict`,
            "POST",
            JSON.stringify({
              district: district,
            }),
            {
              "Content-Type": "application/json",
            }
          );
          setThanas(responseData.thana_list);
        }
      } catch (err) {}
    };
    fetchPlace();
  }, [district]);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        if (thana) {
          let responseData = await sendRequest(
            `http://${url}:${port}/api/person/getCenterByThana`,
            "POST",
            JSON.stringify({
              thana: thana,
            }),
            {
              "Content-Type": "application/json",
            }
          );
          setCenters(responseData.center_list);
        }
      } catch (err) {}
    };
    fetchPlace();
  }, [thana]);

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      present_address: {
        value: "",
        isValid: false,
      },
      permanent_address: {
        value: "",
        isValid: false,
      },
      phone_number: {
        value: "",
        isValid: false,
      },
      center_name: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        let responseData = await sendRequest(
          `http://${url}:${port}/api/center/${auth.uid}/getPersonInfo`
        );

        setPersonInfo(responseData.person_info);
        setCenterId(responseData.person_info.CENTER_ID);
        setCenterName(responseData.person_info.CENTER_NAME);
        console.log(responseData.person_info.CENTER_NAME);
        setFormData(
          {
            name: {
              value: responseData.person_info.NAME,
              isValid: true,
            },
            present_address: {
              value: responseData.person_info.PRESENT_ADDRESS,
              isValid: true,
            },
            permanent_address: {
              value: responseData.person_info.PERMANENT_ADDRESS,
              isValid: true,
            },
            phone_number: {
              value: responseData.contact_info.PHONE_NUMBER,
              isValid: true,
            },
            center_name: {
              value: responseData.person_info.CENTER_NAME,
              isValid: true,
            },
          },
          true
        );

        responseData = await sendRequest(
          `http://${url}:${port}/api/person/getDivision`
        );
        setDivisions(responseData.division_list);
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, personId, setFormData]);

  const UpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://${url}:${port}/api/person/${auth.uid}/updateInfo`,
        "PATCH",
        JSON.stringify({
          name: formState.inputs.name.value,
          present_address: formState.inputs.present_address.value,
          permanent_address: formState.inputs.permanent_address.value,
          phone_number: formState.inputs.phone_number.value,
          center_id: centerId,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      history.push("/");
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  const getDistricts = async (event) => {
    event.preventDefault();
    setDivision(event.target.value);
  };

  const getThanas = async (event) => {
    event.preventDefault();
    setDistrict(event.target.value);
  };

  // const getDistricts = async (event) => {
  //   event.preventDefault();
  //   setDivision(event.target.value);
  //
  //   try {
  //     let responseData = await sendRequest(
  //       `http://${url}:${port}/api/person/getDistrictByDivision`,
  //       "POST",
  //       JSON.stringify({
  //         division: division,
  //       }),
  //       {
  //         "Content-Type": "application/json",
  //       }
  //     );
  //
  //
  //     setDistricts(responseData.district_list);
  //   } catch (err) {}
  // };
  // const getThanas = async (event) => {
  //   event.preventDefault();
  //   setDistrict(event.target.value);
  //   try {
  //     let responseData = await sendRequest(
  //       `http://${url}:${port}/api/person/getThanaByDistrict`,
  //       "POST",
  //       JSON.stringify({
  //         district: district,
  //       }),
  //       {
  //         "Content-Type": "application/json",
  //       }
  //     );
  //     setThanas(responseData.thana_list);
  //   } catch (err) {}
  // };

  const getCenters = async (event) => {
    event.preventDefault();
    setThana(event.target.value);
  };

  const selectCenter = (event) => {
    event.preventDefault();
    setCenterName(event.target.key);
    setCenterId(event.target.value);
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && personInfo && (
        <form className="place-form" onSubmit={UpdateSubmitHandler}>
          <Input
            id="name"
            element="input"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid Name."
            onInput={inputHandler}
            initialValue={personInfo.NAME}
            initialValid={true}
          />
          <Input
            id="present_address"
            element="textarea"
            label="Present Address"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid address"
            onInput={inputHandler}
            initialValue={personInfo.PRESENT_ADDRESS}
            initialValid={true}
          />
          <Input
            id="permanent_address"
            element="textarea"
            label="Permanent Address"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid address"
            onInput={inputHandler}
            initialValue={personInfo.PERMANENT_ADDRESS}
            initialValid={true}
          />

          <h4>Center Name: {centerName}</h4>
          <h4>Change or Select Center</h4>

          {divisions && (
            <select
              className="form-control"
              onChange={getDistricts}
              value={division}
            >
              <option key={"u1"} value={"Division"}>
                Division
              </option>
              <label> Division </label>
              {divisions.map((c) => {
                return (
                  <option
                    key={c.DIVISION}
                    value={c.DIVISION}
                    //onClick={setDivision(c.DIVISION) && getDistricts}
                  >
                    {c.DIVISION}
                  </option>
                );
              })}
            </select>
          )}

          {districts && (
            <select
              className="form-control"
              onChange={getThanas}
              value={district}
            >
              <option key={"u1"} value={"Division"}>
                District
              </option>
              {districts.map((c) => {
                return (
                  <option key={c.DISTRICT} value={c.DISTRICT}>
                    {c.DISTRICT}
                  </option>
                );
              })}
            </select>
          )}

          {thanas && (
            <select
              className="form-control"
              onChange={getCenters}
              value={thana}
            >
              <option key={"u1"} value={"Division"}>
                Thana
              </option>
              {thanas.map((c) => {
                return (
                  <option key={c.THANA} value={c.THANA}>
                    {c.THANA}
                  </option>
                );
              })}
            </select>
          )}

          {centers && (
            <select className="form-control" onChange={selectCenter}>
              <option key={"u1"} value={"Division"}>
                Center
              </option>
              {centers.map((c) => {
                return (
                  <option key={c.CENTER_NAME} value={c.CENTER_ID}>
                    {c.CENTER_NAME}
                  </option>
                );
              })}
            </select>
          )}
          <Input
            id="phone_number"
            element="number"
            label="Add a Phone Number"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid Phone Number"
            onInput={inputHandler}
            initialValue={personInfo.PHONE_NUMBER}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE INFO
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdatePersonInfo;
