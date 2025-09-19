import React from "react";
import "./BudgetCard.css"; // Import CSS for styling

function BudgetCard({ budget }) {
  return (
    <div className="col-12 col-md-6 col-lg-3 d-flex justify-content-center">
      <div className="card text-center budget-card shadow-sm">
        {/* Top section with logo and bank name */}
        <div className="p-3 border-bottom border-dark d-flex flex-column align-items-center">
          {/* Circle logo */}
          <div className="circle-icon mb-2">
            <i className="bi bi-bank"></i>
          </div>
          <h5 className="mb-0">{budget.NewAccount}</h5>
        </div>

        {/* Bottom section with money */}
        <div className="p-3">
          <h5
            className={`mb-0 fw-bold ${
              budget.Amount < 0 ? "text-danger" : "text-success"
            }`}
          >
            {budget.Amount} Rs
          </h5>
        </div>
      </div>
    </div>
  );
}

export default BudgetCard;
