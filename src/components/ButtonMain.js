import React, { useContext, useState } from "react";

import { BudgetDetail, ExpenseDetail } from "../App";
import AddCardModalForm from "./AddCardModalForm";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function ButtonMain() {
  const { showBudget,budgetList } = useContext(BudgetDetail);
  const { setExpenseFilters ,Tags} = useContext(ExpenseDetail);

  const [showModal, setShowModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilters,setSelectedFilters]=useState({'Accounts':[],"Tags":[]})

  const handleClose = (which) => {
    
    (which==='add-expense')?setShowModal(false):setShowFilterModal(false);
  };
  const handleShow = (which) => {
    
    (which==='add-expense')?setShowModal(true):setShowFilterModal(true);
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    setExpenseFilters(selectedFilters)
  }

  const handleChange=(e)=>{
    
    const {name,value,checked}=e.target; //this is internal checked value of event object which is true or false based on the user click not on the condition provided to the prop
    setSelectedFilters((prevSelectedFilter)=>{
      const updated=checked
      ?[...prevSelectedFilter[name],value] 
      :prevSelectedFilter[name].filter((val)=> val!==value)
      return {
        ...prevSelectedFilter,[name]:updated
      }
    })
  }

  return (
    <>
      <div className="d-flex justify-content-center gap-3 border-top pt-4">
        {!showBudget && (
          <button id="apply-filter" className="btn btn-primary" onClick={()=>handleShow('apply-filter')}>
            Filter
          </button>
        )}
        <button id="add-expense" className="btn btn-secondary" onClick={()=>handleShow('add-expense')}>
          {showBudget ? "Add Budget" : "Add Expense"}
        </button>
      </div>
      <AddCardModalForm
        showBudget={showBudget}
        showModal={showModal}
        handleClose={handleClose}
      />
      <Modal show={showFilterModal} onHide={()=>handleClose('apply-filter')}>
        <Modal.Header closeButton>
          <Modal.Title>Filter Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="filter-modal-form" onSubmit={handleSubmit}>
            {/* Accounts Section */}
            <Form.Group className="mb-3">
              <Form.Label>Accounts</Form.Label>
              <div>
                {budgetList.map((budget)=><Form.Check type="checkbox" key={budget.Id} name="Accounts" value={budget.Id} checked={(selectedFilters.Accounts.includes(budget.Id))} label={`${budget.NewAccount}`} onChange={(e)=>handleChange(e)} />)}
              </div>
            </Form.Group>

            {/* Tags Section */}
            <Form.Group className="mb-3">
              <Form.Label>Tags</Form.Label>
              <div>
                {Tags.map((tag)=><Form.Check type="checkbox" key={tag} name="Tags" value={tag} checked={(selectedFilters.Tags.includes(tag))} label={tag} onChange={(e)=>handleChange(e)} />)}
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>handleClose('apply-filter')}>
            Close
          </Button>
          <Button variant="primary" form="filter-modal-form" onClick={()=>handleClose('apply-filter')} type="submit">
            Apply
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

export default ButtonMain;
