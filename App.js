/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import { Provider } from 'react-redux';
 import configureStore from './store/configureStore.js';
 import Main from './components/Main.js';
 import {
   StyleSheet,
 } from 'react-native';
 
 const App = () => {
 
   let store = configureStore()
  
   return (
     <Provider store={store}>
       <Main />
     </Provider>
   );
 };
 
 const styles = StyleSheet.create({
 });
 
 export default App;