import React, { useState, useContext } from "react";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { Link } from "react-router-dom";
import { url, port } from "../../Constant";
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

const SetAppointment = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [isSubmitted, setIssubmiited] = useState(false);
  const [formState, inputHandler, setFormData] = useForm(
    {
      dose_no: {
        value: "",
        isValid: false,
      },
      limit: {
        value: "",
        isValid: false,
      },
      date: {
        value: "",
        isValid: false,
      },
      dose_interval: {
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
        `http://${url}:${port}/api/center/set_appointment`,
        "POST",
        JSON.stringify({
          center_id: auth.uid,
          dose_no: formState.inputs.dose_no.value,
          limit: formState.inputs.limit.value,
          date: formState.inputs.date.value,
          dose_interval: formState.inputs.dose_interval.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      console.log(responseData.message);
      setIssubmiited(true);
    } catch (err) {}
  };
  if (isSubmitted) {
    return <Redirect path="/manage"></Redirect>;
  }
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Set Appointment</h2>
        <hr />
        <form onSubmit={SubmitHandler}>
          <Input
            element="input"
            id="dose_no"
            type="number"
            label="Dose Number"
            validators={[VALIDATOR_MINLENGTH(1)]}
            errorText="Please enter a valid Dose Number."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="limit"
            type="number"
            label="Limit"
            validators={[VALIDATOR_MINLENGTH(1)]}
            errorText="Please enter a valid Number."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="date"
            type="date"
            label="Date"
            validators={[]}
            errorText="Please enter a Date."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="dose_interval"
            type="number"
            label="Dose Interval"
            validators={[VALIDATOR_MINLENGTH(1)]}
            errorText="Please enter a valid Number."
            onInput={inputHandler}
          />

          <Button type="submit">Set Appointment</Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default SetAppointment;
