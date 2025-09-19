import React, { useContext } from "react";
import "./ExpenseCard.css";
import { format } from "date-fns";
import { BudgetDetail } from "../App";

function ExpenseCard({ expense }) {
  const { accountIdToName } = useContext(BudgetDetail);

  const isDebit = expense.Type === "Spend" || expense.Type === "Transfer";
  const amountColor = isDebit ? "text-danger" : "text-success";
  const sign = isDebit ? "-" : "+";

  // account display logic
  let accountDisplay;
  if (expense.Type === "Transfer") {
    accountDisplay = (
      <div className="account-transfer d-flex align-items-center">
        <span className="fw-semibold text-muted medium-text me-2">
          {accountIdToName[expense.Account]}
        </span>
        <img
          src="/images/Transfer-Flow-Icon.png"
          alt="transfer"
          className="account-arrow"
        />
        <span className="fw-semibold text-muted medium-text ms-2">
          {accountIdToName[expense.TransferTo]}
        </span>
      </div>
    );
  } else if (expense.Type === "Spend") {
    accountDisplay = (
      <div className="d-flex align-items-center">
        <span className="fw-semibold text-muted medium-text me-2">
          {accountIdToName[expense.Account]}
        </span>
        <img
          src="/images/Spend-Flow-Icon.png"
          alt="spend"
          className="account-arrow"
        />
      </div>
    );
  } else if (expense.Type === "Income") {
    accountDisplay = (
      <div className="d-flex align-items-center">
        <span className="fw-semibold text-muted medium-text me-2">
          {accountIdToName[expense.Account]}
        </span>
        <img
          src="/images/Income-Flow-Icon.png"
          alt="income"
          className="account-arrow"
        />
      </div>
    );
  }

  return (
    <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center align-items-stretch">
      <div className="card expense-card shadow-sm h-100">
        {/* header only for amount */}
        <div className="card-header d-flex justify-content-center align-items-center">
          <h3 className={`mb-0 fw-bold ${amountColor}`}>
            {sign}
            {expense.Amount}
          </h3>
        </div>

        <div className="card-body d-flex flex-column py-3 px-4">
          {/* new row for accounts */}
          <div className="expense-account mb-3">{accountDisplay}</div>

          <div className="expense-meta text-muted medium-text mb-3">
            {format(expense.Time, "h:mm a, dd MMM yyyy")}
          </div>

          <div className="expense-comment-wrapper mb-3">
            {expense.Comment ? (
              <p className="expense-comment">{expense.Comment}</p>
            ) : (
              <div className="expense-comment-placeholder" />
            )}
          </div>

          <div className="mt-auto text-center">
            <div className="expense-tag-icon-lg">
              <img
                src={`/images/${
                  expense.Tag === "Others" ? expense.Type : expense.Tag
                }.png`}
                alt={expense.Tag}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseCard;
