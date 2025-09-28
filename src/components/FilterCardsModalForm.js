import { useContext } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ExpenseDetail } from "../App";

function FilterCardsModalForm({
  showFilterModal,
  handleClose,
  selectedFilters,
  setSelectedFilters,
  expenseList,
  accountIdToName,
}) {
  const { setExpenseFilters } = useContext(ExpenseDetail);

  const handleSubmit = (e) => {
    e.preventDefault();
    setExpenseFilters(selectedFilters);
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target; //this is internal checked value of event object which is true or false based on the user click not on the condition provided to the prop
    setSelectedFilters((prevSelectedFilter) => {
      const updated = checked
        ? [...prevSelectedFilter[name], value]
        : prevSelectedFilter[name].filter((val) => val !== value);
      return {
        ...prevSelectedFilter,
        [name]: updated,
      };
    });
  };

  const filterAccountOptions = [...new Set(expenseList.flatMap((expense) =>
    expense.TransferTo !== undefined &&
    expense.TransferTo !== null &&
    expense.TransferTo !== ""
      ? [expense.Account, expense.TransferTo]
      : [expense.Account]
  ))];
  const filterTagOptions = [...new Set(expenseList.map((expense) => expense.Tag))];
  return (
    <Modal
      show={showFilterModal}
      onHide={() => handleClose("apply-filter")}
      backdrop="static" // <-- prevents closing on outside click
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Filter Options</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="filter-modal-form" onSubmit={handleSubmit}>
          {/* Accounts Section */}
          <Form.Group className="mb-3">
            <Form.Label>Accounts</Form.Label>
            <div>
              {filterAccountOptions.map((accountId) => (
                <Form.Check
                  type="checkbox"
                  key={accountId}
                  name="Accounts"
                  value={accountId}
                  checked={selectedFilters.Accounts.includes(accountId)}
                  label={`${accountIdToName[accountId]}`}
                  onChange={(e) => handleChange(e)}
                />
              ))}
            </div>
          </Form.Group>

          {/* Tags Section */}
          <Form.Group className="mb-3">
            <Form.Label>Tags</Form.Label>
            <div>
              {filterTagOptions.map((tag) => (
                <Form.Check
                  type="checkbox"
                  key={tag}
                  name="Tags"
                  value={tag}
                  checked={selectedFilters.Tags.includes(tag)}
                  label={tag}
                  onChange={(e) => handleChange(e)}
                />
              ))}
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose("close-filter")}>
          Close
        </Button>
        <Button
          variant="primary"
          form="filter-modal-form"
          onClick={() => handleClose("apply-filter")}
          type="submit"
        >
          Apply
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FilterCardsModalForm;
