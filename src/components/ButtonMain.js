import  { useCallback, useContext, useEffect, useState } from "react";

import { BudgetDetail, ExpenseDetail } from "../App";
import AddCardModalForm from "./AddCardModalForm";
import FilterCardsModalForm from "./FilterCardsModalForm";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import CloseButton from "react-bootstrap/CloseButton";

function ButtonMain() {
  const { showBudget, budgetList ,accountIdToName} = useContext(BudgetDetail);
  const { Tags, expenseList, expenseFilters,setExpenseFilters } = useContext(ExpenseDetail);

  const [showModal, setShowModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    Accounts: [],
    Tags: [],
  });

  const handleClose = (which) => {
    if (which === "add-expense" || which==='add-budget') setShowModal(false);
    else if (which === "close-filter") {
      setShowFilterModal(false);
      setSelectedFilters(expenseFilters);
    } else setShowFilterModal(false);
  };
  const handleShow = (which) => {
    which === "add-expense" ? setShowModal(true) : setShowFilterModal(true);
  };


  const handleFilterRemoval=useCallback((filterToRemoveName,filterToRemoveValue)=>{
    
      const updated={
        ...selectedFilters,
        [filterToRemoveName]:selectedFilters[filterToRemoveName].filter((currentValue)=>currentValue!==filterToRemoveValue)
      }
      setSelectedFilters(updated)
      setExpenseFilters(updated);
      return updated;
  },[selectedFilters, setExpenseFilters])
  

  let filterApplied = expenseFilters.Accounts.length > 0 || expenseFilters.Tags.length > 0;

  useEffect(() => {
  const updatedSelectedFilter = {
    Accounts: selectedFilters.Accounts.filter((accId) => {
      return expenseList.some(expense => expense.Account === accId || expense.TransferTo === accId);
    }),
    Tags: selectedFilters.Tags.filter((tag) => {
      return expenseList.some(expense => expense.Tag === tag);
    })
  };
  
  setSelectedFilters(updatedSelectedFilter);
  setExpenseFilters(updatedSelectedFilter);
}, [expenseList, selectedFilters, setExpenseFilters]); // only depends on expenseList

  return (
    <>
      <div className="d-flex pe-2  justify-content-between gap-3 border-bottom pb-2 pt-2 ps-2">
        {!showBudget && filterApplied && (
          <Stack direction="horizontal" gap={2} style={{ fontSize: "1.25rem" }}>
            {expenseFilters.Accounts.map((accountId) => {
              return (
                <Badge
                  bg="primary"
                  pill
                  className="d-inline-flex align-items-center me-2"
                  key={accountId}
                >
                  {accountIdToName[accountId]}
                  <CloseButton variant="white" className="ms-2" onClick={()=>handleFilterRemoval("Accounts",accountId)} />
                </Badge>
              );
            })}
            {expenseFilters.Tags.map((tag) => {
              return (
                <Badge
                  bg="primary"
                  pill
                  className="d-inline-flex align-items-center me-2"
                  key={tag}
                >
                  {tag}
                  <CloseButton variant="white" className="ms-2" onClick={()=>handleFilterRemoval("Tags",tag)}/>
                </Badge>
              );
            })}
          </Stack>
        )}
        <div className="ms-auto d-flex gap-2">
          {!showBudget && expenseList.length > 0 && (
            <button
              id="apply-filter"
              className="btn btn-primary"
              onClick={() => handleShow("apply-filter")}
            >
              Filter
            </button>
          )}
          {!showBudget && expenseList.length > 0 && (
            <button
              id="apply-filter"
              className="btn btn-primary"
              onClick={() => handleShow("apply-filter")}
            >
              Filter
            </button>
          )}
          
          <button
            id="add-expense"
            className="btn btn-secondary"
            onClick={() => handleShow("add-expense")}
          >
            {showBudget ? "Add Budget" : "Add Expense"}
          </button>
        </div>
      </div>
      <AddCardModalForm
        showBudget={showBudget}
        showModal={showModal}
        handleClose={handleClose}
        mode={'add'}
      />
      <FilterCardsModalForm
        Tags={Tags}
        budgetList={budgetList}
        showFilterModal={showFilterModal}
        handleClose={handleClose}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        expenseList={expenseList}
        accountIdToName={accountIdToName}
      />
    </>
  );
}

export default ButtonMain;
