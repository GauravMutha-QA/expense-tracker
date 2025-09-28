import  { useContext } from "react";
import { BudgetDetail, ExpenseDetail } from "../App";

function ButtonGroup() {

  let {showBudget,setShowBudget, budgetList}=useContext(BudgetDetail)
  let {showExpense,setShowExpense}=useContext(ExpenseDetail)

  const handleClick=(event)=>{
    let buttonId=event.target.id;
    if(buttonId ==='budget' && !showBudget){
      setShowBudget(true);
      setShowExpense(false);
    }
    else if((buttonId ==='expense' && !showExpense)){
      setShowExpense(true);
      setShowBudget(false);

    }
  }

  return (
    <>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-end "
        id="navbarNavAltMarkup"
      >
        <div className="navbar-nav gap-1">
          <button id='budget' className={`nav-link ${showBudget?'active':''} btn btn-primary`} style={{'color':'white'}} onClick={handleClick}>Budget</button>
          <button id="expense" className={`nav-link btn btn-primary ${showExpense?'active':''}`} style={{'color':'white'}} onClick={handleClick} disabled={!(budgetList.length )}>Expense</button>
        </div>
      </div>
    </>
  );
}

export default ButtonGroup;
