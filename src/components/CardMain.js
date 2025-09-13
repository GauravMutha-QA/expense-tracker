import React, { useContext } from "react";
import BudgetCard from "./BudgetCard";
import ExpenseCard from "./ExpenseCard";

import { BudgetDetail, ExpenseDetail } from "../App";

function CardMain() {
  const { showBudget, budgetList } = useContext(BudgetDetail);
  const { expenseList, expenseFilter } = useContext(ExpenseDetail);
  const renderExpenseCards = (list, filter) => {
    console.log(filter);
    let listProjection = [];
    if (filter === "Time") {
      listProjection = [...list].sort((a, b) => {
        return new Date(b.Time) - new Date(a.Time)
      });
    }
    return listProjection.map((expense) => (
      <ExpenseCard key={expense.Id} expense={expense} />
    ));
  };
  return (
    <>
      <div style={{ height: "450px", overflowY: "auto",overflowX: "hidden", scrollbarWidth:'thin',scrollbarColor:' white #232a4d'}}>
        <div className="row g-3 ">
          {showBudget
            ? budgetList.map((budget) => (
                <BudgetCard key={budget.Id} budget={budget} />
              ))
            : renderExpenseCards(expenseList, expenseFilter)}
        </div>
      </div>
    </>
  );
}

export default CardMain;
