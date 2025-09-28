import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import BudgetModalForm from "./BudgetModalForm";
import ExpesneModalForm from "./ExpesneModalForm";

function AddCardModalForm({ showBudget, showModal,showEditModal, handleClose,mode,expense,budget}) {
  let modalTitle;
  if(mode==='edit'){
    modalTitle=showBudget?'Edit Budget':'Edit Expense';
  }
  else modalTitle=showBudget?'Add Budget':'Add Expense';
  return (
    <Modal show={mode==='edit'?showEditModal:showModal} onHide={()=>handleClose(`${(mode==="edit")?'edit-expense':'add-expense'}`)} centered>
      <Modal.Header closeButton className="custom-modal">
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="custom-modal">
        {showBudget ? <BudgetModalForm mode={mode} currentBudget={budget} handleClose={handleClose} /> : <ExpesneModalForm mode={mode} currentExpense={expense} handleClose={handleClose}/>}
      </Modal.Body>
      <Modal.Footer className="custom-modal">
        <Button variant="secondary" onClick={()=>handleClose(`${(mode==="edit")?'edit-expense':'add-expense'}`)}>
          Discard and Close
        </Button>
        <Button variant="primary" form="modal-form" type="submit">
          {mode==='edit'?'Edit':'Add'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddCardModalForm;
