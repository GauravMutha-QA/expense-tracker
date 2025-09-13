import * as yup from "yup";
const msg="Please enter a valid amount"
export const expenseSchema = yup.object().shape({
  Amount: yup
    .number()
    .typeError(msg)   
    .positive(msg)
    .integer(msg)
    .required(msg),
    Account: yup.string().required("Please select an account"),
  Comment: yup.string().max(50,"Character limit exceeded"),
  Tag: yup.string().required("Please select a tag"),
  Type: yup.string().required("Please select the type"),
  TransferTo: yup.string().when("Type", {
    is: "Transfer",
    then: (schema) => schema.required("Please select an account"),
    otherwise: (schema) => schema.notRequired(),
  }),
  Time:yup.string()
});

export const budgetSchema = yup.object().shape({
  Amount: yup
    .number()
    .typeError(msg)   
    .positive(msg)
    .integer(msg)
    .required(msg),
  NewAccount: yup.string().required("Plese enter the account name"),
  Tag: yup.string().required("Please select a tag"),
});
