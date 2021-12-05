import constants from '../constants'

export const addExpenses = (arr) => {
    return {
        type: constants.ADD_EXPENSES,
        payload: arr
    }
}

export const addIncomes = (arr) => {
    return (dispatch) => {
        dispatch({ type: constants.ADD_INCOMES, payload: arr })
    }
}

export const addIncomesTotal = () => {
    return (dispatch) => {
        dispatch({ type: constants.ADD_INCOMES_TOTAL })
    }
}

export const addExpensesTotal = () => {
    return (dispatch) => {
        dispatch({ type: constants.ADD_EXPENSES_TOTAL })
    }
}