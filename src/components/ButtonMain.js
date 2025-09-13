import React, { useContext, useState } from "react";

import { BudgetDetail, ExpenseDetail } from "../App";
import AddCardModalForm from "./AddCardModalForm";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function ButtonMain() {
  const { showBudget } = useContext(BudgetDetail);
  const { setExpenseFilter } = useContext(ExpenseDetail);

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };
  const handleShow = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className="d-flex justify-content-center gap-3 border-top pt-4">
        {!showBudget && (
          <DropdownButton
            id="dropdown-button-drop-up"
            drop="up"
            title="Filter"
            key={"up"}
            data-bs-theme="dark"
          >
            <Dropdown.Item onClick={() => setExpenseFilter("Time")}>
              Time(default)
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setExpenseFilter("Account")}>
              Account
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setExpenseFilter("Account")}>
              Tags
            </Dropdown.Item>
          </DropdownButton>
        )}
        <button className="btn btn-secondary" onClick={handleShow}>
          {showBudget ? "Add Budget" : "Add Expense"}
        </button>
      </div>
      <AddCardModalForm
        showBudget={showBudget}
        showModal={showModal}
        handleClose={handleClose}
      />
    </>
  );
}

export default ButtonMain;
