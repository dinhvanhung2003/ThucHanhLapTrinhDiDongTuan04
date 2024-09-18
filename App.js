import * as React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Screen2C from './components/Screen2C';
import ScreenTiki from './components/ScreenTiki';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Screen2C')}
      >
        <Text style={styles.buttonText}>Screen2C</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ScreenTiki')}
      >
        <Text style={styles.buttonText}>ScreenTiki</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginVertical: 10, 
    padding: 10,
    backgroundColor: '#33CCFF',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Screen2C" component={Screen2C} />
        <Stack.Screen name="ScreenTiki" component={ScreenTiki} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
