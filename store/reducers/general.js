import constants from '../constants';

const initialState = {
    incomes: [],
    incomesTotal: 0,
    expenses: [],
    expensesTotal: 0,
    savedBalances: [],
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case constants.ADD_INCOMES:
            return {
                ...state,
                incomes: action.payload,
            }
        case constants.ADD_INCOMES_TOTAL:
            let counter1 = 0;
            for(let i = 0; i < state.incomes.length; i++) {
            counter1 = counter1 + state.incomes[i].total
            }
            return {
                ...state,
                incomesTotal: counter1,
            }
        case constants.ADD_EXPENSES:
            return {
                ...state,
                expenses: action.payload
            }
        case constants.ADD_EXPENSES_TOTAL:
            let counter2 = 0;
            for(let i = 0; i < state.expenses.length; i++) {
            counter2 = counter2 + state.expenses[i].total
            }
            return {
                ...state,
                expensesTotal: counter2,
            }
        default: return state
    }
}

export default reducer;