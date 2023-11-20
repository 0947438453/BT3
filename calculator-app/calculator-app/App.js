import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';

export const BMI = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [BMI, setBMI] = useState(0);
  const [ktBMI, setKtBMI] = useState('');

  const KTBMI = (bmivaule) => {
    if (bmivaule > 40) {
      return 'Béo phì độ III';
    } else if (35 < bmivaule && bmivaule < 40) {
      return 'Béo phì độ II';
    } else if (30 < bmivaule && bmivaule < 35) {
      return 'Béo phì độ I';
    }
    else if (25 < bmivaule && bmivaule < 30) {
      return 'Tiền béo phì';
    }
    else if (18.5 < bmivaule && bmivaule < 25) {
      return 'Bình thường';
    }else if (bmivaule <18.5) {
      return 'Cân nặng thấp';
    }
  };

  const computeBMI = () => {
    const weightInKg = parseFloat(weight);
    const heightInM = parseFloat(height) / 100;
    const bmi = weightInKg / (heightInM * heightInM);
    setBMI(bmi);
    setKtBMI(KTBMI(bmi));
  };
  const clean = () =>{
    setWeight ('');
    setHeight ('');
    setBMI (0);
    setKtBMI('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Cân nặng (kg)</Text>
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={(text) => setWeight(text)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Chiều cao (cm)</Text>
        <TextInput
          style={styles.input}
          value={height}
          onChangeText={(text) => setHeight(text)}
          keyboardType="numeric"
        />
      </View>

      <Text style={styles.result}>BMI: {BMI.toFixed(2)}</Text>
      <Text style={styles.result}>Tình trạng: {ktBMI}</Text>

      <TouchableOpacity style={styles.button1} onPress={computeBMI}>
        <Text style={styles.buttonText}>Tính toán</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button2} onPress={clean}>
        <Text style={styles.buttonText}>Làm mới</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({   
  container: {     
    flexGrow: 1,     
    backgroundColor: '#fff',     
    alignItems: 'center',     
    justifyContent: 'center',     
    paddingVertical: 20,   
    },   
    inputContainer: {     
      width: '80%',     
      alignItems: 'flex-start',   
    },   
    label: {     
      fontSize: 16,     
      fontWeight: 'bold',     
      marginVertical: 10,   
    },   
    input: {     
      width: '100%',    
      height: 40,    
      borderColor: '#ccc',     
      borderWidth: 1,     
      padding: 10,   
    },   
    button1: {     
      backgroundColor: 'lightgreen',     
      width: '40%',     
      height: 50,     
      marginTop: 20,
      borderRadius: 20,
      color: '#fff',   
      left: -90,  
      borderWidth: 2,
      alignItems: 'center',    
      justifyContent: 'center',   
    },   
    button2: {     
      backgroundColor: 'red',     
      width: '40%',     
      height: 50,     
      marginTop: -50,
      borderRadius: 20,
      left: 90,
      color: '#fff',     
      borderWidth: 2,
      alignItems: 'center',    
      justifyContent: 'center',   
    },   
    buttonText: {     
      fontSize: 16,    
      fontWeight: 'bold',   
    },   
    result: {     
      fontSize: 16,     
      fontWeight: 'bold',     
      marginVertical: 10,   
    }, 
  });

export default BMI;
