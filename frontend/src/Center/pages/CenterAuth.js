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
import "./CenterAuth.css";
import {url, port} from "../../Constant" ;
const CenterAuth = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      center_id: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        `http://${url}:${port}/api/center/login`,
        "POST",
        JSON.stringify({
          center_id: formState.inputs.center_id.value,
          password: formState.inputs.password.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      auth.login(responseData.center.CENTER_ID);
      console.log(responseData.center.CENTER_ID) ;
      console.log('hehe '+ auth.isLoggedIn, auth.isPerson);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Authentication Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          <Input
            element="input"
            id="center_id"
            type="text"
            label="Center ID"
            validators={[VALIDATOR_MINLENGTH(1)]}
            errorText="Please enter a valid Center."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a password atleast 5 characters."
            onInput={inputHandler}
          />
          <Button type="submit">Log In</Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default CenterAuth;
