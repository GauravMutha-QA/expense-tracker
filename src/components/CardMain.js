import  { useContext } from "react";
import BudgetCard from "./BudgetCard";
import ExpenseCard from "./ExpenseCard";

import { BudgetDetail, ExpenseDetail } from "../App";

function CardMain() {
  const { showBudget, budgetList,setBudgetList,accountIdToName } = useContext(BudgetDetail);
  const { expenseList, expenseFilters, setExpenseList,expenseOrder} = useContext(ExpenseDetail);
  const renderExpenseCards = (list, filters,expenseOrder) => {
    let listProjection = [];
    let order=expenseOrder;
    listProjection=list
    .filter((item)=> filters["Accounts"].length===0 || filters["Accounts"].includes(item.Account) || filters["Accounts"].includes(item.TransferTo))
    .filter((item)=> filters["Tags"].length===0 || filters["Tags"].includes(item.Tag))
    .sort((a,b)=>(order==='asc')?(b.Time-a.Time):(a.Time-b.Time))
    return listProjection.map((expense) => (
      <ExpenseCard key={expense.Id} expense={expense} setExpenseList={setExpenseList} setBudgetList={setBudgetList} accountIdToName={accountIdToName} showBudget={showBudget}/>
    ));
  };
  return (
    <>
      <div style={{ height: "525px", overflowY: "auto",overflowX: "hidden", scrollbarWidth:'thin',scrollbarColor:' white #232a4d'}}>
        <div className="row g-3 pt-2 ps-2 pe-2`">
          {showBudget
            ? budgetList.map((budget) => (
                <BudgetCard key={budget.Id} budget={budget} setBudgetList={setBudgetList} accountIdToName={accountIdToName} showBudget={showBudget} setExpenseList={setExpenseList}/>
              ))
            : renderExpenseCards(expenseList, expenseFilters,expenseOrder)}
        </div>
      </div>
    </>
  );
}

export default CardMain;
