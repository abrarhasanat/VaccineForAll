import React, { useState, useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./CenterAuth.css";
import { url, port } from "../../Constant";
import SuccesModal from "../../shared/components/UIElements/SuccessModal";
const UpdateStorage = () => {
  const history = useHistory();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      vaccine_name: {
        value: "",
        isValid: false,
      },
      arrival_date: {
        value: "",
        isValid: false,
      },
      arrival_dose: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const SubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        `http://${url}:${port}/api/center/${auth.uid}/update_storage`,
        "POST",
        JSON.stringify({
          vaccine_name: formState.inputs.vaccine_name.value,
          arrival_date: formState.inputs.arrival_date.value,
          arrival_dose: formState.inputs.arrival_dose.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      setIsSubmitted(true);
    } catch (err) {}
  };

  let clear_error = () => {
    setIsSubmitted(false);
    history.push(`/manage`);
  };
  return (
    <React.Fragment>
      {isSubmitted && (
        <SuccesModal info={"Vaccine Added Successfully"} onClear={clear_error} />
      )}
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Write Arrived Vaccine Info</h2>
        <hr />
        <form onSubmit={SubmitHandler}>
          <Input
            element="input"
            id="vaccine_name"
            type="text"
            label="Vaccine Name"
            validators={[VALIDATOR_MINLENGTH(1)]}
            errorText="Please enter a valid Vaccine Name."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="arrival_date"
            type="date"
            label="Arrival Date"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid date."
            onInput={inputHandler}
          />

          <Input
            element="input"
            id="arrival_dose"
            type="number"
            label="Arrived Doses"
            validators={[VALIDATOR_MINLENGTH(1)]}
            errorText="Please enter a valid Number."
            onInput={inputHandler}
          />
          <Button type="submit">Add Vaccine</Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default UpdateStorage;
