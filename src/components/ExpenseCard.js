import React from "react";
import "./ExpenseCard.css"; // import the CSS
import { format } from "date-fns";

function ExpenseCard({expense}) {
  return (
    <div className="col-12 col-md-6 col-lg-3 d-flex justify-content-center">
      <div
        className="card text-center expense-card"
        style={{ backgroundColor: "#ffd078" }}
      >
        {/* Top section (Amount + Bank Name in same row) */}
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-dark">
          <h4 style={{'color':`${(expense.Type==='Spend')?'Red':'Green'}`}} className="mb-0">{`${(expense.Type==='Spend')?'-':'+'}${expense.Amount}`} </h4>
          <span className="fw-bold">{expense.Account}</span>
        </div>

        {/* Middle section (Time) */}
        <div className="p-3 border-bottom border-dark">
          <span>{format(expense.Time, "h:mm a dd/MM/yyyy")}</span>
        </div>

        {/* New Description row */}
        <div className="p-3 border-bottom border-dark">
          <span>{expense.Comment}</span>
        </div>

        {/* Bottom section (Only circular icon) */}
        <div className="d-flex justify-content-center p-2">
          <div className="circle-icon">
            {/* Replace with icon library (Bootstrap Icons, FontAwesome, etc.) */}
            <i className="bi bi-tags"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseCard;
