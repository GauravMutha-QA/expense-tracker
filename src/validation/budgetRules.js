export function budgetValidation(values, budgetList) {
    let error='';
    const duplicateBudgetName=budgetList.some((budget)=>{ return budget.NewAccount===values.NewAccount})
    if(duplicateBudgetName){
        error='Budget with exact same name already exists'
    }
    return error;
}

export function budgetUpdate(values, prevBudgetList) {
  return prevBudgetList.map((budget) => {
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
}
