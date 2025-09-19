import React, { useContext } from "react";
import BudgetCard from "./BudgetCard";
import ExpenseCard from "./ExpenseCard";

import { BudgetDetail, ExpenseDetail } from "../App";

function CardMain() {
  const { showBudget, budgetList } = useContext(BudgetDetail);
  const { expenseList, expenseFilters} = useContext(ExpenseDetail);
  const renderExpenseCards = (list, filters) => {
    console.log(filters,list);
    let listProjection = [];
    listProjection=list
    .filter((item)=> filters["Accounts"].length===0 || filters["Accounts"].includes(item.Account) || filters["Accounts"].includes(item.TransferTo))
    .filter((item)=> filters["Tags"].length===0 || filters["Tags"].includes(item.Tag))
    return listProjection.map((expense) => (
      <ExpenseCard key={expense.Id} expense={expense} />
    ));
  };
  return (
    <>
      <div style={{ height: "450px", overflowY: "auto",overflowX: "hidden", scrollbarWidth:'thin',scrollbarColor:' white #232a4d'}}>
        <div className="row g-3 pt-1">
          {showBudget
            ? budgetList.map((budget) => (
                <BudgetCard key={budget.Id} budget={budget} />
              ))
            : renderExpenseCards(expenseList, expenseFilters)}
        </div>
      </div>
    </>
  );
}

export default CardMain;
