import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import useForm from "../hooks/useForm.js";
import { BudgetDetail } from "../App";
import { budgetSchema } from "../validation/schema.js";
import { budgetValidation } from "../validation/budgetRules.js";

function BudgetModalForm() {
  const initialBudgetValues = { Amount: "", NewAccount: "", Tag: "" };

  const { budgetList,setBudgetList } = useContext(BudgetDetail);

  const handleBudgetSubmit = (values) => {
    const error = budgetValidation(values, budgetList);
    if (error.length) {
      alert(error);
      return;
    }
    values.Id = crypto.randomUUID();
    setBudgetList((prev) => {
      return [...prev, values];
    });
  };

  const { values, errors, changeValue, handleSubmit } = useForm(
    initialBudgetValues,
    budgetSchema,
    handleBudgetSubmit
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
        <Form.Label>Account</Form.Label>
        <Form.Control
          name="NewAccount"
          type="text"
          value={values.NewAccount}
          onChange={changeValue}
          isInvalid={errors.NewAccount}
        />
        <Form.Control.Feedback type="invalid">
          {errors.NewAccount}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Tag</Form.Label>
        <Form.Control
          name="Tag"
          type="text"
          value={values.Tag}
          onChange={changeValue}
          isInvalid={errors.Tag}
        />
        <Form.Control.Feedback type="invalid">
          {errors.Tag}
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
}

export default BudgetModalForm;
