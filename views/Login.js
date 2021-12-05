import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList
} from 'react-native';

const Login = (props) => {
    useEffect(() => {
    }, [])
  
    return (
      <View>
        <SafeAreaView />
        <Text>Hola</Text>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
  });

const mapStateToProps = state => {
    return {
        general: state.general
    }
}

export default connect(mapStateToProps)(Login);