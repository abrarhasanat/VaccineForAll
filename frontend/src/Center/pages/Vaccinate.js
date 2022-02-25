import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { url, port } from "../../Constant";
import { Link } from "react-router-dom";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./CenterAuth.css";
import { Redirect } from "react-router-dom";
import SuccesModal from "../../shared/components/UIElements/SuccessModal";
import VaccineInfoList from "../../person/components/VaccineInfoList";
import PersonInfo from "../../person/components/PersonInfo";
const Vaccinate = () => {
  const auth = useContext(AuthContext);
  let { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [personInfo, setPersonInfo] = useState();
  const [vaccinationInfo, setVaccinationInfo] = useState();
  const [isLegal, setIsLegal] = useState(false);
  const [personId, setPersonId] = useState();
  const [isVaccinated, setIsVaccinated] = useState(false);
  const [birthCertificateNo, setBirthCertificateNo] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);
  const [doseNo, setDoseNo] = useState();
  const history = useHistory();
  const [date, setDate] = useState();
  const [finalSubmit, setFinalSumit] = useState(false);
  const [formState, inputHandler, setFormData] = useForm(
    {
      birth_registration_no: {
        value: "",
        isValid: false,
      },
      vaccinator_id: {
        value: "",
        isValid: false,
      },
      vaccine_name: {
        value: "",
        isValid: false,
      },
      vaccination_date: {
        value: "",
        isValid: false,
      },
      dose_no: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchData = async () => {
      if (vaccinationInfo && !finalSubmit) {
        try {
          const responseData = await sendRequest(
            "http://localhost:5000/api/center/login/update_vacc_info",
            "POST",
            JSON.stringify({
              person_id: personId,
              vaccinator_id: formState.inputs.vaccinator_id.value,
              vaccine_name: formState.inputs.vaccine_name.value,
              vaccination_date: date,
              dose_no: doseNo,
              center_id: auth.uid,
            }),
            {
              "Content-Type": "application/json",
            }
          );
          setFinalSumit(true);
        } catch (err) {}
      } else if (isLegal) {
        try {
          let responseData = await sendRequest(
            `http://${url}:${port}/api/person/${personId}/getPersonInfo`
          );
          console.log(responseData.person_info);
          setPersonInfo(responseData.person_info);
          setVaccinationInfo(responseData.vaccination_info);
        } catch (err) {}
      } else if (doseNo) {
        try {
          let responseData = await sendRequest(
            `http://${url}:${port}/api/center/${auth.uid}/islegal`,
            "POST",
            JSON.stringify({
              person_id: personId,
              date: formState.inputs.date.value,
              dose_no: formState.inputs.dose_no.value,
            }),
            {
              "Content-Type": "application/json",
            }
          );
          console.log(" abrar ");
          console.log(responseData);
          setIsLegal(true);
          setFormData(
            {
              birth_certificate_no: {
                value: birthCertificateNo,
                valid: true,
              },

              date: {
                value: date,
                valid: true,
              },
              dose_no: {
                value: doseNo,
                valid: true,
              },
            },
            true
          );
        } catch (err) {}
      } else if (birthCertificateNo) {
        try {
          let responseData = await sendRequest(
            `http://${url}:${port}/api/center/${auth.uid}/bid`,
            "POST",
            JSON.stringify({
              birth_certificate_no: formState.inputs.birth_certificate_no.value,
            }),
            {
              "Content-Type": "application/json",
            }
          );
          setPersonId(responseData.person_id.PERSON_ID);
          setFormData(
            {
              birth_certificate_no: {
                value: birthCertificateNo,
                valid: true,
              },
            },
            true
          );
        } catch (ere) {}
      }
    };
    fetchData();
  }, [
    sendRequest,
    auth.uid,
    birthCertificateNo,
    doseNo,
    setFormData,
    isLegal,
    formSubmit,
  ]);
  let personId_ = null;
  const SubmitHandler = async (event) => {
    event.preventDefault();
    if (!birthCertificateNo)
      setBirthCertificateNo(formState.inputs.birth_certificate_no.value);
    if (!doseNo) setDoseNo(formState.inputs.dose_no.value);
    if (!date) setDate(formState.inputs.date.value);
    setFormSubmit(!formSubmit);

    // if (!personId) {
    //   try {
    //     let responseData = await sendRequest(
    //       `http://${url}:${port}/api/center/${auth.uid}/bid`,
    //       "POST",
    //       JSON.stringify({
    //         birth_certificate_no: formState.inputs.birth_certificate_no.value,
    //       }),
    //       {
    //         "Content-Type": "application/json",
    //       }
    //     );
    //     setPersonId(responseData.person_id.PERSON_ID);
    //     personId_ = responseData.person_id.PERSON_ID;
    //     console.log("abrar : hasnat");
    //     responseData = await sendRequest(
    //       `http://${url}:${port}/api/center/${auth.uid}/islegal`,
    //       "POST",
    //       JSON.stringify({
    //         person_id: personId_,
    //         date: formState.inputs.date.value,
    //         dose_no: formState.inputs.dose_no.value,
    //       }),
    //       {
    //         "Content-Type": "applicaton/json",
    //       }
    //     );
    //     console.log("haha : haha");
    //     setIsLegal(true);
    //     setFormData(
    //       {
    //         ...formState.inputs,
    //         birth_certificate_no: undefined,
    //         vaccinator_id: undefined,
    //         vaccine_name: undefined,
    //         dose_no: undefined,
    //         date: undefined,
    //       },
    //       formState.inputs.birth_certificate_no.isValid &&
    //         formState.inputs.date.isValid
    //     );
    //     responseData = await sendRequest(
    //       `http://${url}:${port}/api/person/${personId}`,
    //       {
    //         "Content-Type": "applicaton/json",
    //       }
    //     );

    //     setPersonInfo(responseData.person_info);
    //     setVaccinationInfo(responseData.vaccination_info);
    //   } catch (err) {}
    // } else {
    //   try {
    //     let responseData = await sendRequest(
    //       `http://${url}:${port}/api/center/login/update_vacc_info`,
    //       "POST",
    //       JSON.stringify({
    //         person_id: personId,
    //         vaccinator_id: formState.inputs.vaccinator_id.value,
    //         vaccine_name: formState.inputs.vaccine_name.value,
    //         vaccination_date: formState.inputs.vaccination_date.value,
    //         dose_no: formState.inputs.dose_no.value,
    //         center_id: auth.uid,
    //       }),
    //       {
    //         "Content-Type": "application/json",
    //       }
    //     );

    //     setPersonId(responseData.personId);
    //   } catch (err) {}
    // }
  };
  clearError = () => {
    setIsLegal(false);
    setPersonId();
    setPersonInfo();
    setVaccinationInfo();
    setIsVaccinated(false);
    history.push(`/manage`);
  };
  // if (clearFound) {
  //   console.log(clearFound);
  //   return <Redirect path="/manage/vaccinate" exact></Redirect>;
  // }
  return (
    <React.Fragment>
      {finalSubmit && (
        <SuccesModal info={"Vaccinated Successfully"} onClear={clearError} />
      )}
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Vaccinate</h2>
        <hr />
        {!isLoading && (
          <form onSubmit={SubmitHandler}>
            {!isLoading && (
              <Input
                element="input"
                id="birth_certificate_no"
                type="number"
                label="Birth Certificate Number"
                validators={[VALIDATOR_MINLENGTH(1)]}
                errorText="Please enter a valid Birth Registration Number."
                onInput={inputHandler}
                initialValue={birthCertificateNo}
                initialValid={true}
              />
            )}
            {personInfo && <PersonInfo items={personInfo} />}
            {vaccinationInfo && <VaccineInfoList items={vaccinationInfo} />}
            {!isLoading && isLegal && (
              <Input
                element="input"
                id="vaccinator_id"
                type="number"
                label="Vaccinator Id"
                validators={[VALIDATOR_MINLENGTH(1)]}
                errorText="Please enter a valid Number."
                onInput={inputHandler}
              />
            )}

            {isLegal && (
              <Input
                element="input"
                id="vaccine_name"
                type="text"
                label="Vaccine Name"
                validators={[]}
                errorText="Please enter a Date."
                onInput={inputHandler}
              />
            )}

            {personId && (
              <Input
                element="input"
                id="date"
                type="date"
                label="Vaccination Date"
                validators={[]}
                errorText="Please enter a Date."
                onInput={inputHandler}
                initialValid={true}
                initialValue={date}
              />
            )}

            {personId && (
              <Input
                element="input"
                id="dose_no"
                type="number"
                label="Dose No"
                validators={[]}
                errorText="Please enter a Date."
                onInput={inputHandler}
                initialValue={doseNo}
                initialValid={true}
              />
            )}
            <Button type="submit">Vaccinate</Button>
          </form>
        )}
      </Card>
    </React.Fragment>
  );
};

export default Vaccinate;
