import { useState } from "react";
import "./BudgetCard.css"; // Import CSS for styling
import Modal from "react-bootstrap/Modal";
import AddCardModalForm from "./AddCardModalForm";
import Button from "react-bootstrap/esm/Button";

function getRandomColor() {
  // 15 soft pastel colors
  const pastel = [
    "#FFD6E0", // pink
    "#D6EFFF", // light blue
    "#FFF5BA", // pale yellow
    "#D6FFD6", // mint green
    "#E0D6FF", // lavender
    "#FFE0D6", // peach
    "#D6FFF5", // aqua
    "#FDE2FF", // light purple
    "#E2F0CB", // light lime
    "#FFDFD3", // blush
    "#C2F0FC", // sky blue
    "#F6DFEB", // light magenta
    "#F9F7D9", // cream
    "#D9F9F7", // pale teal
    "#F7D9F9", // light pink
  ];
  return pastel[Math.floor(Math.random() * pastel.length)];
}

function BudgetCard({
  budget,
  setBudgetList,
  accountIdToName,
  showBudget,
  setExpenseList,
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [pendingDeleteInfo, setPendingDeleteInfo] = useState({});

  const [circleColor] = useState(getRandomColor());

  const handleDeleteIconClick = (id, accountName, amount) => {
    setPendingDeleteInfo({
      id: id,
      amount: amount,
      accountName: accountName,
    });
    setShowDeleteModal(true);
  };

  const handleClose = (which) => {
    setShowEditModal(false);
  };

  const handleConfirmDelete = () => {
    const { id, accountName } = pendingDeleteInfo;
    setBudgetList((prevBudgetList) => {
      return prevBudgetList.filter((budget) => {
        return budget.Id !== id;
      });
    });
    let transferCardExists = false,
      updatedExpenseList;
    setExpenseList((prevExpenseList) => {
      updatedExpenseList = prevExpenseList.flatMap((prevExpense) => {
        let markForDelete =
          prevExpense.Account === id || prevExpense.TransferTo === id;

        if (
          markForDelete &&
          (prevExpense.Type === "Spend" || prevExpense.Type === "Income")
        ) {
          return [];
        } else if (markForDelete && prevExpense.Type === "Transfer") {
          if (prevExpense.Invalid !== undefined)
            return []; //transfer card already has a deleted account involved
          else return [{ ...prevExpense, Invalid: { id, accountName } }];
        } else return [prevExpense];
      });
      

      return updatedExpenseList;
    });
    if (transferCardExists === false) setShowDeleteModal(false);
    setPendingDeleteInfo({});
  };
  return (
    <div className="col-12 col-md-6 col-lg-3 d-flex justify-content-center">
      {/* Top-right edit/delete buttons */}
      <div className="card text-center budget-card shadow-sm">
        <div className="budget-card-actions">
          <button
            className="btn btn-sm btn-light"
            title="Edit"
            onClick={() => {
              return setShowEditModal(true);
            }}
          >
            <i className="fas fa-pencil-alt fa-sm"></i>
          </button>
          <button
            className="btn btn-sm btn-light"
            onClick={() =>
              handleDeleteIconClick(budget.Id, budget.NewAccount, budget.Amount)
            }
            title="Delete"
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
        {/* Top section with logo and bank name */}
        <div className="p-3 border-bottom border-dark d-flex flex-column align-items-center">
          {/* Circle logo */}
          <div className="circle-icon mb-2" style={{ background: circleColor }}>
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
          Are you sure you want to delete the Budget?This will delete all its
          Spend and Income transaction automatically!
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
        budget={budget}
      />
    </div>
  );
}

export default BudgetCard;
