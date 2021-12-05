/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useContext, useEffect, useState } from 'react';
 import { AuthContext, AuthProvider } from './utils/authProvider.js';
 import auth from '@react-native-firebase/auth';
 import { Provider } from 'react-redux';
 import configureStore from './store/configureStore.js';
 import Main from './components/Main.js';
 import AuthScreen from './components/AuthScreen.js';
 import {
   StyleSheet,
 } from 'react-native';
 
 const App = () => {
   const { user, setUser } = useContext(AuthContext);
   const [initializing, setInitializing] = useState(true)

   const onAuthStateChanged = (data) => {
      setUser(data);
      if(initializing) setInitializing(false)
   }

   useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber;
   }, [])
 
   let store = configureStore()

   if(initializing) return null;
  
   return (
      <Provider store={store}>
        { user ? <Main /> : <AuthScreen />}
      </Provider>
   );
 };
 
 const styles = StyleSheet.create({
 });
 
 export default App;