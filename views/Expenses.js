import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import * as firebase from '../utils/firebase';
import { getExpensesData, addExpenseData, handleExpensesData, setCategoryData } from '../utils/expenses';
import DatePicker from 'react-native-date-picker';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from 'react-native';

const Expenses = (props) => {
    const [refreshing, setRefreshing] = useState(false);
    const [expenses, setExpenses] = useState([{text: 'No loaded expenses yet', dueDate: Date.now()}]);
    const [date, setDate] = useState(new Date());
    const [dateOpen, setDateOpen] = useState(false);
    const [categorySelected, setCategorySelected] = useState('Others');
    const [expense, setExpense] = useState({
      title: '',
      description: '',
      total: 0,
    })
    const [totalExpenses, setTotalExpenses] = useState(0)
    const input1 = useRef('input1')
    const input2 = useRef('input2')
    const input3 = useRef('input3')
  
    const handleExpenses = (text, arg) => {
      const obj = {
        ...expense,
        category: categorySelected,
        date: date
      }
      setExpense(handleExpensesData(text, arg, obj))
    }

    const handleCategories = (index) => {
      setCategorySelected(setCategoryData(index))
    }

    const handleConfirm = (date) => {
      setDateOpen(false)
      setDate(date)
    }
  
    const addExpense = async() => {
      try {
        await addExpenseData(expense)
        input1.current.clear()
        input2.current.clear()
        input3.current.clear()
        await getExpensesData()
      } catch (error) {
        console.log('Something went wrong', error)
      }
    }
  
    const getExpenses  = async() => {
      setRefreshing(true)
      try {
        const data = await getExpensesData()
        setExpenses(data)
      } catch (error) {
        console.log('Something went wrong', error)
      }
      setRefreshing(false)
    }
  
    useEffect(() => {
      firebase.firestore().collection('expenses').onSnapshot((snap) => {
        const expenses = snap.docs.map((doc) => ({id: doc.id, ...doc.data()}))
        setExpenses(expenses)
        let counter = 0;
        for(let i = 0; i < expenses.length; i++) {
          counter = counter + expenses[i].total
        }
        setTotalExpenses(counter)
      })
    }, [])
  
    return (
      <View style={styles.viewContainer}>
        <SafeAreaView />
        <View style={styles.areaWrapper}>
          <Text style={styles.styledTitle}>Add new expenses</Text>
          <Text style={styles.styledText}>Title</Text>
          <TextInput ref={input1} style={styles.styledInput} placeholder="Food" onChangeText={(text) => handleExpenses(text, 1)}/>
          <Text style={styles.styledText}>Description</Text>
          <TextInput ref={input2} style={styles.styledInput} placeholder="Bread and milk" onChangeText={(text) => handleExpenses(text, 2)}/>
          <Text style={styles.styledText}>Category</Text>
          <View style={styles.categoryContainer}>
            <Pressable style={[styles.categoryButton, (categorySelected === 'Food' && styles.categorySelectedButton)]} onPress={() => handleCategories(0)}>
              <Text style={[styles.categoryText, (categorySelected === 'Food' && styles.categorySelectedText)]}>Food</Text>
            </Pressable>
            <Pressable style={[styles.categoryButton, (categorySelected === 'Bills' && styles.categorySelectedButton)]} onPress={() => handleCategories(1)}>
              <Text style={[styles.categoryText, (categorySelected === 'Bills' && styles.categorySelectedText)]}>Bills</Text>
            </Pressable>
            <Pressable style={[styles.categoryButton, (categorySelected === 'Home' && styles.categorySelectedButton)]} onPress={() => handleCategories(2)}>
              <Text style={[styles.categoryText, (categorySelected === 'Home' && styles.categorySelectedText)]}>Home</Text>
            </Pressable>
            <Pressable style={[styles.categoryButton, (categorySelected === 'Clothes' && styles.categorySelectedButton)]} onPress={() => handleCategories(3)}>
              <Text style={[styles.categoryText, (categorySelected === 'Clothes' && styles.categorySelectedText)]}>Clothes</Text>
            </Pressable>
            <Pressable style={[styles.categoryButton, (categorySelected === 'Self care' && styles.categorySelectedButton)]} onPress={() => handleCategories(4)}>
              <Text style={[styles.categoryText, (categorySelected === 'Self care' && styles.categorySelectedText)]}>Self care</Text>
            </Pressable>
            <Pressable style={[styles.categoryButton, (categorySelected === 'Entertainment' && styles.categorySelectedButton)]} onPress={() => handleCategories(5)}>
              <Text style={[styles.categoryText, (categorySelected === 'Entertainment' && styles.categorySelectedText)]}>Entertainment</Text>
            </Pressable>
            <Pressable style={[styles.categoryButton, (categorySelected === 'Others' && styles.categorySelectedButton)]} onPress={() => handleCategories(6)}>
              <Text style={[styles.categoryText, (categorySelected === 'Others' && styles.categorySelectedText)]}>Others</Text>
            </Pressable>
          </View>
          <Text style={styles.styledText}>Total</Text>
          <TextInput ref={input3} style={styles.styledInput} placeholder="$10" onChangeText={(text) => handleExpenses(text, 3)}/>
          <Pressable style={styles.dateButton} onPress={() => setDateOpen(true)}>
            <Text style={styles.addDateText}>Add due date</Text>
          </Pressable>
          <DatePicker
            modal
            mode="date"
            title="Pick a date"
            open={dateOpen}
            date={date}
            // onConfirm={(date) => {
            //   setDateOpen(false)
            //   setDate(date)
            // }}
            onConfirm={(date) => handleConfirm(date)}
            onCancel={() => {
              setDateOpen(false)
            }}
          />
          <Pressable style={styles.sendButton} onPress={addExpense}>
            <Text style={styles.sendText}>Confirm</Text>
          </Pressable>
        </View>
        <View style={styles.areaWrapper}>
          <Text style={styles.styledTitle}>This month's expenses</Text>
          <FlatList
            data={props.general.expenses}
            onRefresh={getExpenses}
            refreshing={refreshing}
            contentContainerStyle={{margin: 20, height: 160}}
            renderItem={({item, index}) => (
            <View style={styles.listWrapper}>
              <Text style={styles.styledText}><Text style={{fontWeight: 'bold'}}>{item.title}:</Text> {item.description} - ${item.total}</Text>
            </View>
          )} />
          <Text style={styles.styledTitle}>Total: ${totalExpenses}</Text>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    viewContainer: {
      width: '100%',
      height: '100%',
      backgroundColor: '#931A25',
    },
    areaWrapper: {
      padding: 20,
    },
    styledInput: {
      backgroundColor: '#FFF8E5',
      padding: 5,
      borderRadius: 5,
      marginTop: 5,
      marginBottom: 5,
    },
    styledText: {
      color: '#fff'
    },
    styledTitle: {
      fontWeight: 'bold',
      color: '#fff',
      alignSelf: 'center'
    },
    listWrapper: {
      alignSelf: 'center',
    },
    sendButton: {
      backgroundColor: '#FFF8E5',
      alignSelf: 'center',
      padding: 10,
      borderRadius: 10,
    },
    sendText: {
      color:'#E05D5D'
    },
    dateButton: {
      backgroundColor: 'transparent',
      alignSelf: 'center',
      padding: 10,
    },
    addDateText: {
      color:'#FFF8E5'
    },
    categoryContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    categorySelectedButton: {
      backgroundColor: '#FFF8E5',
      alignSelf: 'center',
      margin: 5,
      padding: 5,
      borderRadius: 10,
    },
    categorySelectedText: {
      color:'#E05D5D'
    },
    categoryButton: {
      backgroundColor: '#931A25',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#FFF8E5',
      alignSelf: 'center',
      margin: 5,
      padding: 5,
      borderRadius: 10,
    },
    categoryText: {
      color: '#FFF8E5'
    },
  });

const mapStateToProps = state => {
  return {
      general: state.general
  }
}

export default connect(mapStateToProps)(Expenses);