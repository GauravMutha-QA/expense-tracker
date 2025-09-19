export function expenseValidation(values,list){
    let alertMessage='';
    //find the budget using the id
    let selectedSBudgetId=values.Account;
    const selectedSourceBudget=list.find((budget) => selectedSBudgetId===budget.Id)
    
    if((values.Type==='Spend' || values.Type==='Transfer') && selectedSourceBudget.Amount<values.Amount){
        alertMessage=`${selectedSourceBudget.NewAccount}'s balance is now in deficit`;
    }
    return alertMessage;
}