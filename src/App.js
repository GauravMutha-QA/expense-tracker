import "./App.css";
import ButtonGroup from "./components/ButtonGroup";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import React, { useState } from "react";

export const BudgetDetail = React.createContext();
export const ExpenseDetail = React.createContext();

function App() {
  const [showBudget, setShowBudget] = useState(true);
  const [budgetList, setBudgetList] = useState([
    {Id:crypto.randomUUID(),  NewAccount: "SBI", Amount:3240,Tag:"" },
    {Id:crypto.randomUUID(),  NewAccount: "Kotak", Amount:3240,Tag:"" },
    {Id:crypto.randomUUID(),  NewAccount: "BOB", Amount:3240,Tag:"" },
  ]);
  const [showExpense, setShowExpense] = useState(false);
  const [expenseList, setExpenseList] = useState([]);
  const [expenseFilter,setExpenseFilter]=useState('Time');
  return (
    <div className="App">
      <BudgetDetail.Provider
        value={{ showBudget, setShowBudget, budgetList, setBudgetList }}
      >
        <ExpenseDetail.Provider value={{ showExpense, setShowExpense, expenseList, setExpenseList, expenseFilter,setExpenseFilter}}>
          <Navbar></Navbar>
          <Main></Main>
        </ExpenseDetail.Provider>
      </BudgetDetail.Provider>
    </div>
  );
}

export default App;
