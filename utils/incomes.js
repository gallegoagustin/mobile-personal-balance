import * as firebase from './firebase'

export const handleIncomesData = (text, arg, obj) => {
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

export const addIncomesData = async(arg) => {
    await firebase.firestore().collection('incomes').add({ 
      title: arg.title,
      description: arg.description,
      total: parseInt(arg.total),
      date: arg.date,
    })
}

export const getIncomesData = async() => {
    const incomesArr = await firebase.firestore().collection('incomes').sortBy('date').get();
    const temp = []
    incomesArr.forEach( item => {
      temp.push({ id: item.id, ...item.data() })
    })
    return temp
}