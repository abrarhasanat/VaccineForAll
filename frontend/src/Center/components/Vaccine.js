import React, { useState, useContext , useEffect } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import { AuthContext } from "../../shared/context/auth-context";
import "./Vaccine.css";
import Avatar from "../../shared/components/UIElements/Avatar";
import {useForm} from "../../shared/hooks/form-hook"
import Input from "../../shared/components/FormElements/Input";
const Vaccine = (props) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [numOfDoses, setNumOfDoses] = useState(props.description);
  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log("DELETING...");
  };

  const [formState, inputHandler,setFormData] = useForm(
    {  
      description: {
        value: "",
        isValid: true,
      },
    },
    false
  );

  const doseSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); // send this to the backend!
  };

  useEffect(() => {
      setFormData(
        {
          description: {
            value: props.description,
            isValid: true
          }
        },
        true
      );
  }, [setFormData, props.description]);



  return (
    <React.Fragment>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this Vaccine? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__info">
            <h1 className="vaccine-title">{props.title}</h1>
            <p>{props.description + " doses are availabe"}</p>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default Vaccine;
