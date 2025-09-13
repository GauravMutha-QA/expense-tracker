import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import BudgetModalForm from "./BudgetModalForm";
import ExpesneModalForm from "./ExpesneModalForm";

function AddCardModalForm({ showBudget, showModal, handleClose }) {

  // const initialFormData = {
  //   Amount: "",
  //   Type: "",
  //   Account: "",
  //   Comment: "",
  //   Tag: "",
  //   TransferTo: "",
  // };


  // useEffect(() => {
  //   if (!showModal) {
  //     setFormData(initialFormData);
  //   }
  // }, [showModal]);

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton className="custom-modal">
        <Modal.Title>{showBudget ? "Add Budget" : "Add Expense"}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="custom-modal">
        {showBudget ? <BudgetModalForm /> : <ExpesneModalForm/>}
      </Modal.Body>
      <Modal.Footer className="custom-modal">
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" form="modal-form" type="submit">
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddCardModalForm;
