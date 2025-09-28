export function budgetValidation(values,mode,currentBudget, budgetList) {
  let error = "";
  let checkingSameAccount=mode==='edit' && currentBudget!==undefined && currentBudget.NewAccount===values.NewAccount;
  const duplicateBudgetName = budgetList.some((budget) => {
    return (budget.NewAccount === values.NewAccount && !checkingSameAccount);
  });
  if (duplicateBudgetName) {
    error = "Budget with exact same name already exists";
  }
  return error;
}

export function budgetUpdate(values, prevBudgetList, mode, currentExpense) {
  let updatedBudgetListUndo,finalBudgetList;

  //when expense is edited, we assumed two transactions, undo first always, commit new one
  if (mode === "edit") {
    updatedBudgetListUndo = prevBudgetList.map((budget) => {
      const amount = Number(currentExpense.Amount);

      if (budget.Id === currentExpense.Account) {
        if (
          currentExpense.Type === "Spend" ||
          currentExpense.Type === "Transfer"
        )
          return { ...budget, Amount: budget.Amount + amount };
        else return { ...budget, Amount: budget.Amount - amount };
      } else if (budget.Id === currentExpense.TransferTo) {
        return { ...budget, Amount: budget.Amount - amount };
      }
      return budget;
    });
  }
  else updatedBudgetListUndo=prevBudgetList;
  //when expense is added
  finalBudgetList = updatedBudgetListUndo.map((budget) => {
    const amount = Number(values.Amount);

    if (budget.Id === values.Account) {
      if (values.Type === "Spend" || values.Type === "Transfer")
        return { ...budget, Amount: budget.Amount - amount };
      else return { ...budget, Amount: budget.Amount + amount };
    } else if (budget.Id === values.TransferTo) {
      return { ...budget, Amount: budget.Amount + amount };
    }
    return budget;
  });

  return finalBudgetList;
}
