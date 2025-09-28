import { useCallback, useContext, useEffect, useState } from "react";
import { BudgetDetail, ExpenseDetail } from "../App";
import AddCardModalForm from "./AddCardModalForm";
import FilterCardsModalForm from "./FilterCardsModalForm";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import CloseButton from "react-bootstrap/CloseButton";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./ButtonMain.css";

// Import Bootstrap Icons (make sure you have bootstrap-icons installed)
import { Plus, Filter, SortDown } from "react-bootstrap-icons";

function ButtonMain() {
  const { showBudget, budgetList, accountIdToName } = useContext(BudgetDetail);
  const {
    Tags,
    expenseList,
    expenseFilters,
    setExpenseFilters,
    expenseOrder,
    setExpenseOrder,
  } = useContext(ExpenseDetail);

  const [showModal, setShowModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    Accounts: [],
    Tags: [],
  });

  const handleClose = (which) => {
    if (which === "add-expense" || which === "add-budget") setShowModal(false);
    else if (which === "close-filter") {
      setShowFilterModal(false);
      setSelectedFilters(expenseFilters);
    } else setShowFilterModal(false);
  };

  const handleShow = (which) => {
    which === "add-expense" ? setShowModal(true) : setShowFilterModal(true);
  };

  const handleFilterRemoval = useCallback(
    (filterToRemoveName, filterToRemoveValue) => {
      const updated = {
        ...selectedFilters,
        [filterToRemoveName]: selectedFilters[filterToRemoveName].filter(
          (currentValue) => currentValue !== filterToRemoveValue
        ),
      };
      setSelectedFilters(updated);
      setExpenseFilters(updated);
      return updated;
    },
    [selectedFilters, setExpenseFilters]
  );

  let filterApplied =
    expenseFilters.Accounts.length > 0 || expenseFilters.Tags.length > 0;

  useEffect(() => {
    const updatedSelectedFilter = {
      Accounts: selectedFilters.Accounts.filter((accId) => {
        return expenseList.some(
          (expense) => expense.Account === accId || expense.TransferTo === accId
        );
      }),
      Tags: selectedFilters.Tags.filter((tag) => {
        return expenseList.some((expense) => expense.Tag === tag);
      }),
    };

    setSelectedFilters(updatedSelectedFilter);
    setExpenseFilters(updatedSelectedFilter);
  }, [expenseList]);

  return (
    <>
      <div className="button-main-container d-flex pe-2 justify-content-between gap-3 border-bottom pb-2 pt-2 ps-2">
        {!showBudget && filterApplied && (
          <div className="d-none d-md-flex filter-badges-container">
            <Stack
              direction="horizontal"
              gap={2}
              style={{ fontSize: "1.25rem" }}
              className="filter-badges-scroll"
            >
              {expenseFilters.Accounts.map((accountId) => {
                return (
                  <Badge
                    bg="primary"
                    pill
                    className="d-inline-flex align-items-center me-2 flex-shrink-0"
                    key={accountId}
                  >
                    {accountIdToName[accountId]}
                    <CloseButton
                      variant="white"
                      className="ms-2"
                      onClick={() => handleFilterRemoval("Accounts", accountId)}
                    />
                  </Badge>
                );
              })}
              {expenseFilters.Tags.map((tag) => {
                return (
                  <Badge
                    bg="primary"
                    pill
                    className="d-inline-flex align-items-center me-2 flex-shrink-0"
                    key={tag}
                  >
                    {tag}
                    <CloseButton
                      variant="white"
                      className="ms-2"
                      onClick={() => handleFilterRemoval("Tags", tag)}
                    />
                  </Badge>
                );
              })}
            </Stack>
          </div>
        )}
        <div className="button-group ms-auto d-flex gap-2">
          {/* Sort Button */}
          {!showBudget && expenseList.length > 1 && (
            <DropdownButton
              id="dropdown-basic-button"
              title={
                <>
                  <span className="button-text">Sort By</span>
                  <SortDown className="button-icon" />
                </>
              }
              className="sort-button"
            >
              <Dropdown.Item
                active={expenseOrder === "asc"}
                onClick={() => setExpenseOrder("asc")}
              >
                Time(Newest First)
              </Dropdown.Item>
              <Dropdown.Item
                active={expenseOrder === "desc"}
                onClick={() => setExpenseOrder("desc")}
              >
                Time(Oldest First)
              </Dropdown.Item>
            </DropdownButton>
          )}

          {/* Filter Button */}
          {!showBudget && expenseList.length > 0 && (
            <div className="filter-button-container">
              <button
                id="apply-filter"
                className="btn btn-primary filter-button"
                onClick={() => handleShow("apply-filter")}
              >
                <span className="button-text">Filter</span>
                <div className="filter-icon-with-badge">
                  <Filter className="button-icon" />
                  <span className="filter-badge">
                    {expenseFilters.Accounts.length +
                      expenseFilters.Tags.length}
                  </span>
                </div>
              </button>
            </div>
          )}

          {/* Add Button */}
          <button
            id="add-expense"
            className="btn btn-secondary add-button"
            onClick={() => handleShow("add-expense")}
          >
            <span className="button-text">
              {showBudget ? "Add Budget" : "Add Expense"}
            </span>
            <Plus className="button-icon" />
          </button>
        </div>
      </div>

      <AddCardModalForm
        showBudget={showBudget}
        showModal={showModal}
        handleClose={handleClose}
        mode={"add"}
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
