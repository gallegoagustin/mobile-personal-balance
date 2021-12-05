/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useEffect, useState } from 'react';
 import { connect } from 'react-redux';
 import { NavigationContainer } from '@react-navigation/native';
 import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
 import { addExpenses, addExpensesTotal, addIncomes, addIncomesTotal } from '../store/actions';
 import * as firebase from '../utils/firebase'
import { sortExpenses } from '../utils/stats';
 import Expenses from '../views/Expenses';
 import Incomes from '../views/Incomes';
 import Stats from '../views/Stats';
 import {
   StyleSheet,
 } from 'react-native';
import { AuthProvider } from '../utils/authProvider';
 
 const Main = (props) => {

    const [expenses, setExpenses] = useState([])
    const [expensesTotal, setExpensesTotal] = useState(0)
    const [incomes, setIncomes] = useState([])
    const [incomesTotal, setIncomesTotal] = useState(0)
    const [currentBalance, setCurrentBalance] = useState(0)
    const [sortedExpenses, setSortedExpenses] = useState([])
  
   const BottomMenu = createMaterialBottomTabNavigator()

   const refreshStats = () => {
    const balance = incomesTotal && expensesTotal && incomesTotal - expensesTotal
    setCurrentBalance(balance)
    setSortedExpenses(sortExpenses(expenses))
   }

   useEffect(() => {
      firebase.firestore().collection('expenses').onSnapshot((snap) => {
        const expensesData = snap.docs.map((doc) => ({id: doc.id, ...doc.data()}))
        props.addExpenses(expensesData)
        props.addExpensesTotal()
        refreshStats()
      })
      firebase.firestore().collection('incomes').onSnapshot((snap) => {
        const incomesData = snap.docs.map((doc) => ({id: doc.id, ...doc.data()}))
        props.addIncomes(incomesData)
        props.addIncomesTotal()
        refreshStats()
        console.log('props', props.general)
      })
   }, [])
 
   return (
    <NavigationContainer>
        <BottomMenu.Navigator>
        <BottomMenu.Screen
            name="Stats"
            component={Stats}
        />
        <BottomMenu.Screen
            name="Incomes"
            component={Incomes}
        />
        <BottomMenu.Screen
            name="Expenses"
            component={Expenses}
        />
        </BottomMenu.Navigator>
    </NavigationContainer>
   );
 };
 
 const styles = StyleSheet.create({
 });
 
 const mapStateToProps = state => {
   return {
       general: state.general
   }
 }

 const mapDispatchToProps = dispatch => {
    return {
        addExpenses: (arr) => {
            return dispatch(addExpenses(arr))
        },
        addIncomes: (arr) => {
            return dispatch(addIncomes(arr))
        },
        addIncomesTotal: () => {
            return dispatch(addIncomesTotal())
        },
        addExpensesTotal: () => {
            return dispatch(addExpensesTotal())
        }
    }
}
  
 export default connect(mapStateToProps, mapDispatchToProps)(Main);