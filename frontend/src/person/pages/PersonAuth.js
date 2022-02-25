import React, { useState, useContext } from "react";

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
import { personContext } from "../../shared/context/person-context";
import "./PersonAuth.css";
import { url, port } from "../../Constant";
const PersonAuth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      birth_certificate_no: {
        value: "",
        isValid: false,
      },
      date_of_birth: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          present_address: undefined,
          permanent_address: undefined,
          phone_number: undefined,
        },
        formState.inputs.birth_certificate_no.isValid &&
          formState.inputs.date_of_birth.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
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
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `http://${url}:${port}/api/person/login`,
          "POST",
          JSON.stringify({
            birth_certificate_no: formState.inputs.birth_certificate_no.value,
            date_of_birth: formState.inputs.date_of_birth.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        console.log(responseData.person);
        console.log(responseData.person.PERSON_ID);
        auth.login(responseData.person.PERSON_ID);
        auth.changeRule();
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          `http://${url}:${port}/api/person/signup`,
          "POST",
          JSON.stringify({
            birth_certificate_no: formState.inputs.birth_certificate_no.value,
            name: formState.inputs.name.value,
            present_address: formState.inputs.present_address.value,
            permanent_address: formState.inputs.permanent_address.value,
            date_of_birth: formState.inputs.date_of_birth.value,
            phone_number: formState.inputs.phone_number.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        console.log("abrar");
        console.log(responseData);
        console.log(responseData.person.id);
        auth.login(responseData.person.id);
        auth.changeRule();
      } catch (err) {}
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Let's Get Vaccinated</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          <Input
            element="input"
            id="birth_certificate_no"
            type="number"
            label="Birth Certificate No"
            validators={[VALIDATOR_MINLENGTH(1)]}
            errorText="Please enter a valid Birth Certificate No."
            onInput={inputHandler}
          />
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && (
            <Input
              element="input"
              id="present_address"
              type="text"
              label="Present Address"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a  valid address."
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && (
            <Input
              element="input"
              id="permanent_address"
              type="text"
              label="Permanent Address"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a  valid address."
              onInput={inputHandler}
            />
          )}
          <Input
            element="input"
            id="date_of_birth"
            type="date"
            label="Date_Of_Birth"
            validators={[]}
            errorText="Please enter a valid Birth Certificate No, at least 6 characters."
            onInput={inputHandler}
          />
          {!isLoginMode && (
            <Input
              element="input"
              id="phone_number"
              type="number"
              label="Phone No"
              validators={[VALIDATOR_MINLENGTH(3)]}
              errorText="Please enter a valid Mobile No."
              onInput={inputHandler}
            />
          )}
          <Button type="submit">{isLoginMode ? "LOGIN" : "REGISTER"}</Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "REGISTER" : "LOGIN"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default PersonAuth;
