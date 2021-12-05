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
 import Register from '../views/Register';
 import Login from '../views/Login';
 import {
   StyleSheet,
 } from 'react-native';
import { AuthProvider } from '../utils/authProvider';
 
 const AuthScreen = (props) => {
  
   const BottomMenu = createMaterialBottomTabNavigator()

   useEffect(() => {
   }, [])
 
   return (
    <NavigationContainer>
        <BottomMenu.Navigator>
        <BottomMenu.Screen
            name="Login"
            component={Login}
        />
        <BottomMenu.Screen
            name="Register"
            component={Register}
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
  
 export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);