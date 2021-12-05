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

const Register = (props) => {
    useEffect(() => {
    }, [])
  
    return (
      <View>
        <SafeAreaView />
        <Text>hola</Text>
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

export default connect(mapStateToProps)(Register);