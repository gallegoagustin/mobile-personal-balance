import * as firebase from './firebase'

export const handleExpensesData = (text, arg, obj) => {
    if(arg === 1) {
      return {
        ...obj,
        title: text,
      }
    }
    if(arg === 2) {
      return {
        ...obj,
        description: text,
      }
    }
    if(arg === 3) {
      return {
        ...obj,
        total: text,
      }
    }
}

export const addExpenseData = async(arg) => {
    await firebase.firestore().collection('expenses').add({ 
      title: arg.title,
      description: arg.description,
      total: parseInt(arg.total),
      date: arg.date,
      category: arg.category
    })
}

export const getExpensesData = async() => {
    const expensesArr = await firebase.firestore().collection('expenses').get();
    const temp = []
    expensesArr.forEach( item => {
      temp.push({ id: item.id, ...item.data() })
    })
    return temp
}

export const setCategoryData = (index) => {
  let options = [
    'Food',
    'Bills',
    'Home',
    'Clothes',
    'Self care',
    'Entertainment',
    'Others'
  ]
  return options[index]
}