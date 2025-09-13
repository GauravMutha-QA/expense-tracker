export function expenseValidation(values,list){
    let error='';
    //find the budget using the id
    let selectedSBudgetId=values.Account;
    const selectedSourceBudget=list.find((budget) => selectedSBudgetId===budget.Id)
    
    if((values.Type==='Spend' || values.Type==='Transfer') && selectedSourceBudget.Amount<values.Amount){
        error=`Insufficient Balance in ${selectedSourceBudget.NewAccount} to make the transaction`;
    }
    return error;
}