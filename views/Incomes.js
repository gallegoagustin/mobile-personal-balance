import React, { useState, useEffect, useRef } from 'react';
import * as firebase from '../utils/firebase'
import { getIncomesData, addIncomesData, handleIncomesData } from '../utils/incomes'
import DatePicker from 'react-native-date-picker';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const Incomes = () => {
    const [incomes, setIncomes] = useState([{text: 'No loaded incomes yet', dueDate: Date.now()}])
    const [refreshing, setRefreshing] = useState(false);
    const [income, setIncome] = useState({
      title: '',
      description: '',
      total: 0,
    })
    const [totalIncomes, setTotalIncomes] = useState(0)
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const input1 = useRef('input1')
    const input2 = useRef('input2')
    const input3 = useRef('input3')
  
    const handleIncomes = (text, arg) => {
      setIncome(handleIncomesData(text, arg, income))
    }
  
    const addIncome = async() => {
      try {
        await addIncomesData({
          ...income,
          date: date
        })
        input1.current.clear()
        input2.current.clear()
        input3.current.clear()
        await getIncomesData()
      } catch (error) {
        console.log('Something went wrong', error)
      }
    }
  
    const getIncomes  = async() => {
      setRefreshing(true)
      try {
        const data = await getIncomesData()
        setIncomes(data)
      } catch (error) {
        console.log('Something went wrong', error)
      }
      setRefreshing(false)
    }
  
    useEffect(() => {
      firebase.firestore().collection('incomes').onSnapshot((snap) => {
        const incomes = snap.docs.map((doc) => ({id: doc.id, ...doc.data()}))
        setIncomes(incomes)
        let counter = 0;
        for(let i = 0; i < incomes.length; i++) {
          counter = counter + incomes[i].total
        }
        setTotalIncomes(counter)
      })
    }, [])
  
    return (
      <View style={styles.viewContainer}>
        <SafeAreaView />
        <View style={styles.areaWrapper}>
          <Text style={styles.styledTitle}>Add new incomes</Text>
          <Text style={styles.styledText}>Title</Text>
          <TextInput ref={input1} style={styles.styledInput} placeholder="Sallary" onChangeText={(text) => handleIncomes(text, 1)}/>
          <Text style={styles.styledText}>Description</Text>
          <TextInput ref={input2} style={styles.styledInput} placeholder="October's sallary" onChangeText={(text) => handleIncomes(text, 2)}/>
          <Text style={styles.styledText}>Total</Text>
          <TextInput ref={input3} style={styles.styledInput} placeholder="$1000" onChangeText={(text) => handleIncomes(text, 3)}/>
          <Pressable style={styles.dateButton} onPress={() => setOpen(true)}>
            <Text style={styles.addDateText}>Add income date</Text>
          </Pressable>
          <DatePicker
            modal
            mode="date"
            title="Pick a date"
            open={open}
            date={date}
            onConfirm={(date) => {
              setOpen(false)
              setDate(date)
            }}
            onCancel={() => {
              setOpen(false)
            }}
          />
          <Pressable style={styles.sendButton} onPress={addIncome}>
            <Text style={styles.sendText}>Confirm</Text>
          </Pressable>
        </View>
        <View style={styles.areaWrapper}>
          <Text style={styles.styledTitle}>This month's incomes</Text>
          <FlatList
            data={incomes}
            onRefresh={getIncomes}
            refreshing={refreshing}
            contentContainerStyle={{margin: 20, height: 160}}
            renderItem={({item, index}) => (
            <View style={styles.listWrapper}>
              <Text style={styles.styledText}><Text style={{fontWeight: 'bold'}}>{item.title}:</Text> {item.description} - ${item.total}</Text>
            </View>
          )} />
          <Text style={styles.styledTitle}>Total: ${totalIncomes}</Text>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    viewContainer: {
      width: '100%',
      height: '100%',
      backgroundColor: '#00A19D',
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
    }
  });

  export default Incomes