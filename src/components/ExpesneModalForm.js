import React, { forwardRef, useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { BudgetDetail, ExpenseDetail } from "../App";
import useForm from "../hooks/useForm";
import { expenseSchema } from "../validation/schema.js";
import { expenseValidation } from "../validation/expenseRules.js";
import { budgetUpdate } from "../validation/budgetRules.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ExpesneModalForm() {
  const initialExpenseValues = {
    Amount: 0,
    Type: "",
    Account: "",
    Comment: "",
    Tag: "",
    TransferTo: "",
    Time: new Date(),
  };

  

  const { setExpenseList, Tags } = useContext(ExpenseDetail);
  const { setBudgetList, budgetList } = useContext(BudgetDetail);
  const ExampleCustomInput = forwardRef(
    ({ value, onClick, className }, ref) => (
      <button
        type="button"
        className={className}
        onClick={onClick}
        ref={ref}
        style={{ "margin-left": "10px" }}
      >
        {value || "Select date"}
      </button>
    )
  );

  const handleExpenseSubmit = (values) => {
    //check for any invalid transaction
    const alertMessage = expenseValidation(values, budgetList);
    if (alertMessage.length) {
      alert(alertMessage);
    }

    //Update the expenses list
    setExpenseList((prev) => {
      values.Id = crypto.randomUUID();
      return [...prev, values];
    });
    //update the budget after transaction
    setBudgetList((prevList) => budgetUpdate(values, prevList));
  };

  const { values, errors, changeValue, handleSubmit } = useForm(
    initialExpenseValues,
    expenseSchema,
    handleExpenseSubmit
  );

  return (
    <Form id="modal-form" onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          name="Amount"
          type="text"
          value={values.Amount}
          onChange={changeValue}
          isInvalid={errors.Amount}
        />
        <Form.Control.Feedback type="invalid">
          {errors.Amount}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Type</Form.Label>
        <Form.Select
          name="Type"
          value={values.Type}
          onChange={changeValue}
          isInvalid={errors.Type}
        >
          <option value="" disabled>
            -- Select type --
          </option>
          <option value="Spend">Spend</option>
          <option value="Transfer">Transfer</option>
          <option value="Income">Income</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.Type}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          {values.Type === "Transfer" ? "Transfer From" : "Account"}
        </Form.Label>
        <Form.Select
          name="Account"
          value={values.Account}
          onChange={changeValue}
          isInvalid={errors.Account}
        >
          <option value="" disabled>
            -- Select an option --
          </option>
          {budgetList.map((budget) => (
            <option key={budget.Id} value={budget.Id}>
              {budget.NewAccount}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.Account}
        </Form.Control.Feedback>
      </Form.Group>

      {values.Type === "Transfer" && (
        <Form.Group className="mb-3">
          <Form.Label>Transfer To</Form.Label>
          <Form.Select
            name="TransferTo"
            value={values.TransferTo || ""}
            onChange={changeValue}
            isInvalid={errors.TransferTo}
          >
            <option value="" disabled>
              -- Select an option --
            </option>
            {budgetList
              .filter((budget) => budget.Id !== values.Account)
              .map((budget) => {
                return (
                  <option key={budget.Id} value={budget.Id}>
                    {budget.NewAccount}
                  </option>
                );
              })}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.TransferTo}
          </Form.Control.Feedback>
        </Form.Group>
      )}

      <Form.Group className="mb-3">
        <Form.Label>Comment</Form.Label>
        <Form.Control
          name="Comment"
          type="text"
          value={values.Comment}
          onChange={changeValue}
          isInvalid={errors.Comment}
        />
        <Form.Control.Feedback type="invalid">
          {errors.Comment}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          Tag
        </Form.Label>
        <Form.Select
          name="Tag"
          value={values.Tag}
          onChange={changeValue}
          isInvalid={errors.Tag}
        >
          <option value="" disabled>
            -- Select an option --
          </option>
          {Tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.Tag}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Select date and Time</Form.Label>
        <DatePicker
          selected={values.Time}
          onChange={(Time) =>
            changeValue({
              target: {
                name: "Time",
                value: Time,
              },
            })
          }
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={1}
          dateFormat="h:mm a dd/MM/yyyy"
          customInput={
            <ExampleCustomInput type="button" className="btn btn-primary" />
          }
        />
      </Form.Group>
    </Form>
  );
}

export default ExpesneModalForm;
