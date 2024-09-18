import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  CheckBox,
} from 'react-native';
import { useState } from 'react';

const { width, height } = Dimensions.get('window');

export default function Screen2C() {
  const [passWord, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(12);
  const [useSymbols, setUseSymbols] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useLowerCase, setUseLowerCase] = useState(true);
  const [useUpperCase, setUseUpperCase] = useState(true);

  const getRandomLength = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generatePassword = () => {
    let charset = '';
    let newPassword = '';

    
    if (useSymbols) charset += '!@#$%^&*()';
    if (useNumbers) charset += '0123456789';
    if (useLowerCase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (useUpperCase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    if (charset.length === 0) {
      setPassword('Select at least one option');
      return;
    }

    const randomLength = getRandomLength(8, 16); 
    setPasswordLength(randomLength);

    for (let i = 0; i < randomLength; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(newPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Password{'\n'}Generator</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} value={passWord} editable={false} />
      </View>
      <View style={{ flex: 4 }}>
        <View style={styles.lengthContainer}>
          <Text style={styles.label}>Password length</Text>
          <TextInput
            style={styles.lengthInput}
            value={passwordLength.toString()}
            editable={false}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <Text style={styles.label}>Include lower case letters</Text>
          <CheckBox
            value={useLowerCase}
            onValueChange={setUseLowerCase}
            style={styles.checkbox}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <Text style={styles.label}>Include upper case letters</Text>
          <CheckBox
            value={useUpperCase}
            onValueChange={setUseUpperCase}
            style={styles.checkbox}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <Text style={styles.label}>Include numbers</Text>
          <CheckBox
            value={useNumbers}
            onValueChange={setUseNumbers}
            style={styles.checkbox}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <Text style={styles.label}>Include symbols</Text>
          <CheckBox
            value={useSymbols}
            onValueChange={setUseSymbols}
            style={styles.checkbox}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={generatePassword}>
          <Text style={styles.buttonText}>Generate Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#331263',
    justifyContent: 'center',
    paddingHorizontal: '10%', 
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: width * 0.07, 
  },
  inputContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    color: 'white',
    backgroundColor: '#100421',
    width: width * 0.8,
    height: height * 0.07, 
    textAlign: 'center',
    fontSize: width * 0.05, 
    padding: 10,
  },
  lengthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    width: width * 0.8,             
    marginBottom: 15  
              },            
  label: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: width * 0.02,
    fontSize: width * 0.05,
  },
  lengthInput: {
    backgroundColor: 'white',
    width: width * 0.20, 
    height: height * 0.06, 
    textAlign: 'center',
    fontSize: width * 0.04, 
    padding: 3,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#5040A8',
    padding: width * 0.02, 
    width: width * 0.6, 
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: 'white',
    fontSize: width * 0.03,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',  
    justifyContent: 'space-between',
    width: width * 0.8,   
    marginBottom: 15,      
  },
  checkbox: {
    marginLeft: 'auto',   
  },
});
