import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { sortExpenses } from '../utils/stats';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList
} from 'react-native';

const Stats = (props) => {
    const [currentBalance, setCurrentBalance] = useState(0)
    const [sortedExpenses, setSortedExpenses] = useState([])

    useEffect(() => {
      setCurrentBalance(props.general.incomesTotal - props.general.expensesTotal)
      setSortedExpenses(sortExpenses([...props.general.expenses]))
    }, [])
  
    return (
      <View style={styles.viewContainer}>
        <SafeAreaView />
        <View style={styles.areaWrapper}>
          <Text style={styles.styledTitle}>My current balance</Text>
          <View style={styles.rowContainer}>
            <View>
              <Text style={styles.incomesText}>Incomes</Text>
              <Text style={styles.incomesResult}>${props.general.incomesTotal}</Text>
            </View>
            <View>
              <Text style={styles.expensesText}>Expenses</Text>
              <Text style={styles.expensesResult}>${props.general.expensesTotal}</Text>
            </View>
          </View>
          <Text style={[styles.totalResult, (props.general.expensesTotal > props.general.incomesTotal && styles.redResult), (props.general.incomesTotal > props.general.expensesTotal && styles.greenResult)]}>$ {currentBalance}</Text>
          <View style={styles.rowContainer}>
          <Pressable style={styles.styledButton}>
            <Text style={styles.styledButtonText}>Save this balance</Text>
          </Pressable>
          <Pressable style={styles.styledButton}>
            <Text style={styles.styledButtonText}>Reset balance</Text>
          </Pressable>
          </View>
        </View>
        <View style={styles.areaWrapper}>
          <Text style={styles.styledTitle}>Expenses by category</Text>
          <FlatList
            data={sortedExpenses}
            contentContainerStyle={{margin: 20, height: 100}}
            renderItem={({item, index}) => (
            <View style={styles.listWrapper}>
              <Text style={styles.styledText}><Text style={{fontWeight: 'bold'}}>{item.category}:</Text> ${item.total}</Text>
            </View>
          )} />
        </View>
        <View style={styles.areaWrapper}>
          <Text style={styles.styledTitle}>Incomes by quantity</Text>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    viewContainer: {
      backgroundColor: '#FFF',
      width: '100%',
      height: '100%',
    },
    areaWrapper: {
      padding: 20,
      margin: 10,
      borderRadius: 10,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#000',
    },
    styledTitle: {
      fontWeight: 'bold',
      color: '#000',
      alignSelf: 'center'
    },
    rowContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20
    },
    incomesText: {
      fontWeight: 'bold',
      color: '#17D7A0',
      textAlign: 'center'
    },
    expensesText: {
      fontWeight: 'bold',
      color: '#B91646',
      textAlign: 'center'
    },
    incomesResult: {
      fontWeight: 'bold',
      color: '#17D7A0',
      fontSize: 24,
      textAlign: 'center'
    },
    expensesResult: {
      fontWeight: 'bold',
      color: '#B91646',
      fontSize: 24,
      textAlign: 'center'
    },
    totalResult: {
      fontWeight: 'bold',
      color: '#000',
      fontSize: 24,
      textAlign: 'center',
      marginTop: 20,
    },
    greenResult: {
      color: '#17D7A0',
    },
    redResult: {
      color: '#B91646',
    },
    styledButton: {
      backgroundColor: '#FFF8E5',
      alignSelf: 'center',
      padding: 10,
      borderRadius: 10,
    },
    styledButtonText: {
      color:'#E05D5D'
    },
  });

const mapStateToProps = state => {
    return {
        general: state.general
    }
}

export default connect(mapStateToProps)(Stats);