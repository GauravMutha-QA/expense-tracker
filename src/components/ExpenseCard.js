import {  useState } from "react";
import "./ExpenseCard.css";
import { format } from "date-fns";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AddCardModalForm from "./AddCardModalForm";

function ExpenseCard({
  expense,
  setExpenseList,
  setBudgetList,
  accountIdToName,
  showBudget,
}) {
  const isDebit = expense.Type === "Spend";
  const amountColor = isDebit ? "text-danger" : "text-success";
  const sign = isDebit ? "-" : "+";

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [pendingDeleteInfo, setPendingDeleteInfo] = useState({});

  const handleDeleteIconClick = (
    type,
    amount,
    sourceAccountId,
    targetAccountId,
    transactionId
  ) => {
    setPendingDeleteInfo({
      type: type,
      amount: amount,
      sourceAccountId: sourceAccountId,
      targetAccountId: targetAccountId,
      transactionId: transactionId,
    });
    setShowDeleteModal(true);
  };

  const handleClose = (which) => {
    setShowEditModal(false);
  };

  const handleConfirmDelete = () => {
    const { type, amount, sourceAccountId, targetAccountId, transactionId } =
      pendingDeleteInfo;
    setExpenseList((prevExpenseList) => {
      return prevExpenseList.filter((expense) => expense.Id !== transactionId);
    });
    setBudgetList((prevBudgetList) => {
      return prevBudgetList.map((budget) => {
        if (budget.Id === sourceAccountId) {
          if (type === "Spend")
            return { ...budget, Amount: budget.Amount + amount };
          else if (type === "Income")
            return { ...budget, Amount: budget.Amount - amount };
          else if (type === "Transfer")
            return { ...budget, Amount: budget.Amount + amount };
        } else if (budget.Id === targetAccountId) {
          return { ...budget, Amount: budget.Amount - amount };
        }
        return budget;
      });
    });

    setShowDeleteModal(false);
    setPendingDeleteInfo({});
  };

  return (
    <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center align-items-stretch">
      <div className="card expense-card shadow-sm h-100">
        {/* Top-right edit/delete buttons */}
        <div className="expense-card-actions">
          {!expense.Invalid && <button
            className="btn btn-sm btn-light"
            title="Edit"
            onClick={() => {
              return setShowEditModal(true);
            }}
          >
            <i className="fas fa-pencil-alt fa-sm"></i>
          </button>}
          <button
            className="btn btn-sm btn-light"
            onClick={() =>
              handleDeleteIconClick(
                expense.Type,
                Number(expense.Amount),
                expense.Account,
                expense.TransferTo,
                expense.Id
              )
            }
            title="Delete"
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>

        {/* HEADER with Amount + Accounts */}
        <div className="card-header">
          {expense.Type === "Transfer" ? (
            <>
              {/* Left account + spend arrow */}
              <div className="d-flex align-items-center">
                <span className="fw-semibold text-muted medium-text me-2 account-name ">
                  {accountIdToName[expense.Account]}
                  {expense.Invalid &&
                    expense.Invalid.id === expense.Account && (
                      <span
                        className="ms-1 text-warning"
                        title="Account deleted"
                      >
                        <i className="fas fa-exclamation-triangle"></i>
                      </span>
                    )}
                </span>
                <img
                  src="/images/Spend-Flow-Icon.png"
                  alt="transfer-from"
                  className="account-arrow"
                />
              </div>

              {/* Amount in center */}
              <h3 className={`mb-0 fw-bold text-primary`}>{expense.Amount}</h3>

              {/* Right account + income arrow */}
              <div className="d-flex align-items-center">
                <img
                  src="/images/Income-Flow-Icon.png"
                  alt="transfer-to"
                  className="account-arrow me-2"
                />
                <span className="fw-semibold text-muted medium-text">
                  {accountIdToName[expense.TransferTo]}
                  {expense.Invalid &&
                    expense.Invalid.id === expense.TransferTo && (
                      <span
                        className="ms-1 text-warning"
                        title="Account deleted"
                      >
                        <i className="fas fa-exclamation-triangle"></i>
                      </span>
                    )}
                </span>
              </div>
            </>
          ) : expense.Type === "Spend" ? (
            <>
              {/* Amount left, account right with outgoing arrow */}
              <h3 className={`mb-0 fw-bold ${amountColor}`}>
                {sign}
                {expense.Amount}
              </h3>
              <div className="d-flex align-items-center ms-3">
                <span className="fw-semibold text-muted medium-text me-2 account-name">
                  {accountIdToName[expense.Account]}
                </span>
                <img
                  src="/images/Spend-Flow-Icon.png"
                  alt="spend"
                  className="account-arrow"
                />
              </div>
            </>
          ) : (
            <>
              {/* Amount left, account right with incoming arrow */}
              <h3 className={`mb-0 fw-bold ${amountColor}`}>
                {sign}
                {expense.Amount}
              </h3>
              <div className="d-flex align-items-center ms-3">
                <img
                  src="/images/Income-Flow-Icon.png"
                  alt="income"
                  className="account-arrow me-2"
                />
                <span className="fw-semibold text-muted medium-text account-name">
                  {accountIdToName[expense.Account]}
                </span>
              </div>
            </>
          )}
        </div>

        {/* BODY */}
        <div className="card-body d-flex flex-column py-3 px-4">
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
      {/* Confirm deletion Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
        backdrop="static" // <-- prevents closing on outside click
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the transaction?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <AddCardModalForm
        showBudget={showBudget}
        showEditModal={showEditModal}
        handleClose={handleClose}
        mode={"edit"}
        expense={expense}
      />
    </div>
  );
}

export default ExpenseCard;
