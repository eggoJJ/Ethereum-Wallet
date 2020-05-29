import * as React from 'react';
import {initEth, getPub, getPKey, setKey} from '../eth/ethhelper';
import {passRun, checkValidity, checkExist} from '../eth/passhelper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import '../shim.js';
import {Button, Text, View, StyleSheet, TouchableOpacity, Image, TextInput, Alert} from 'react-native';
import 'react-native-gesture-handler';

state = {publicKeyNum: 0, privateKeyNum: 0, p1: '', p2: '', p3: ''};
const styles = StyleSheet.create({
   titleView: {
         flex: 1,
         alignContent: 'center',
         alignItems: 'center'
       },

   titleText: {
         fontSize: 30,
         paddingTop: 20,
         color: '#808080'
       },

    publicKeyText: {
         fontSize: 20,
         paddingRight: 250,
         paddingTop: 100
    },

    privateKeyText: {
         fontSize: 20,
         paddingRight: 250,
         paddingTop: 120
    },

    passText:{
         position: 'absolute',
         fontSize: 20,
         top: 100,
         right: 500

    },

    passText2:{
         position: 'absolute',
         fontSize: 20,
         right: 500,
         top: 150
    },

    valTex:{
      fontSize: 20,
      paddingTop: 100,
      paddingRight: 200,
      color: '#808080'
    },

    keyBox1: {
      position: 'absolute',
      bottom: 370,
      left: 30,
      width: 350,
      height: 38,
      backgroundColor: '#f0fff0',
      borderColor: '#00fa9a',
      borderWidth: 2
    },

    keyBox2: {
      position: 'absolute',
      bottom: 225,
      left: 30,
      width: 350,
      height: 38,
      backgroundColor: '#f0fff0',
      borderColor: '#00fa9a',
      borderWidth: 2
    },

    buttonBox: {
      top: 300,
      width: 200,
      right: 3,
      height: 42,
      backgroundColor: '#f0fff0',
      borderWidth: 2,
      borderColor: '#00fa9a'
    },

    buttonBox2: {
      top: 100,
      width: 200,
      right: 3,
      height: 42,
      backgroundColor: '#f0fff0',
      borderWidth: 2,
      borderColor: '#00fa9a'
    },

    buttonBox3: {
      top: 100,
      width: 200,
      right: 3,
      height: 42,
      backgroundColor: '#f0fff0',
      borderWidth: 2,
      borderColor: '#00fa9a'
    },
    buttonBox4: {
      top: 150,
      width: 200,
      right: 3,
      height: 42,
      backgroundColor: '#f0fff0',
      borderWidth: 2,
      borderColor: '#00fa9a'
    }
});
function whichScreen({navigation}, p1){
  if(p1 == 1){
    navigation.navigate('Home');
  }
  else{
    Alert.alert("Passwords Do Not Match. Try Again.")
    navigation.navigate("Pass")
  }
}
async function valWalletScreen({navigation},p1){
  let tok = await checkExist(p1)

  Alert.alert("This make take a few moments");
  let x = await setData()
  if(tok == 1){
    navigation.navigate("Wallet");
  }
  else{
    Alert.alert("Password was not found. Try again, or create a new one");
    navigation.navigate("Validate")
  }
}

async function setData(){
  await initEth();
  state.publicKeyNum = getPub();
  state.privateKeyNum = await getPKey();
  
}
function HomeScreen({ navigation }){
  return(
         <View style = {styles.titleView}> 
         <Text style =  {styles.titleText}>Ember Etherium Wallet</Text>
         <TouchableOpacity 
             onPress = {() => navigation.navigate('Pass')}
             style = {styles.buttonBox}
             >
             <Text style = {{position: 'absolute', left: 45, bottom: 9}}>Create Password</Text>
         </TouchableOpacity>

         <TouchableOpacity 
             onPress = {() => navigation.navigate('Validate')}
             style = {styles.buttonBox2}
             >
             <Text style = {{position: 'absolute', left: 58, bottom: 10}}>View Wallet</Text>
         </TouchableOpacity>
       </View>
  );
}
function ValidateScreen({navigation}){
return(
     <View style = {styles.titleView}> 

         <Text style =  {styles.titleText}>Ember Etherium Wallet</Text>
         <View style = {styles.keyBox1}></View> 
         <Text style= {styles.valTex}>Enter Password:</Text>
         <TextInput 
            style ={{position: 'absolute', left: 35, top: 190, width: 300, fontSize: 16}}
            onChangeText ={(val) => handleP(val,3)}  
            />
          <TouchableOpacity 
             onPress = {() => valWalletScreen({navigation}, state.p3)}
             style = {styles.buttonBox4}
             > 
             <Text style = {{position: 'absolute', left: 35, bottom: 10}}>Submit Password</Text>
         </TouchableOpacity>
       </View>
   );
}
async function refresh({navigation}){

  Alert.alert("This may take a few moments");
  let x = await setKey();
  let y =await setData();
  navigation.push("Wallet");

}
function WalletScreen({navigation}){

   return(
      <View style = {styles.titleView}> 
         <View style = {styles.keyBox1}>
           <Text>{state.publicKeyNum}</Text>
         </View>
         <View style = {styles.keyBox2}>
           <Text>{state.privateKeyNum}</Text>
         </View>
         <Text style =  {styles.titleText}>Ember Etherium Wallet</Text>
         <Text style= {styles.publicKeyText}>Public Key:</Text>
         <Text style= {styles.privateKeyText}>Private Key:</Text>
         <TouchableOpacity 
             onPress = {() => refresh({navigation})}
             style = {styles.buttonBox2}
             >
             <Text style = {{position: 'absolute', left: 25, bottom: 10}}>Generate Another One</Text>
         </TouchableOpacity>
      </View>
  );
}

function handleP(text, num){
  if(num == 1){
    state.p1 = text;
  }
  else if(num ==2){
    state.p2 = text;
  }
  else{
    state.p3 = text;
  }
}

function PassScreen({navigation}){
  //passRun()
  return(
     <View style = {styles.titleView}> 
         <Text style =  {styles.titleText}>Ember Etherium Wallet</Text>
         <Text style= {styles.publicKeyText}>  Enter Password:</Text>
         <Text style= {styles.privateKeyText}>Confirm:</Text>
         <View style = {styles.keyBox1}></View> 
         <TextInput 
            style ={{position: 'absolute', left: 35, top: 190, width: 300, fontSize: 16}}
            onChangeText ={(val) => handleP(val,1)}  
            />
         <View style = {styles.keyBox2}></View>
         <TextInput 
           style ={{position: 'absolute', left: 35, top: 335, width: 300, fontSize: 16}}
           onChangeText ={(val) => handleP(val,2)}
         />
         <TouchableOpacity 
             onPress = {() => whichScreen({navigation}, checkValidity(state.p1,state.p2))}
             style = {styles.buttonBox3}
             > 
             <Text style = {{position: 'absolute', left: 45, bottom: 10}}>Submit Password</Text>
         </TouchableOpacity>
      </View> 
      //console.log("xd: ", this.state.x)
  );
}

const Stack = createStackNavigator();
export default class App extends React.Component {
     render() {
          return(
              <NavigationContainer>
                    <Stack.Navigator initialRouteName="Home">
                      <Stack.Screen name="Home" component={HomeScreen} />
                      <Stack.Screen name="Wallet" component={WalletScreen} />
                      <Stack.Screen name="Pass" component={PassScreen} />
                      <Stack.Screen name="Validate" component={ValidateScreen} />
                    </Stack.Navigator>
              </NavigationContainer>
          );
  }

  dummy(){
          }
  generateRandomNum(){
    console.log(this.state.privateKeyNum);
    console.log(this.state.publicKeyNum);
    this.setState({privateKeyNum : Math.floor(Math.random() * (100000 - 50 + 1)) + 50});
    this.setState({publicKeyNum : Math.floor(Math.random() * (100000 - 50 + 1)) + 50});
    console.log(this.state.privateKeyNum);
    console.log(this.state.publicKeyNum);
  }
 
    
  
}

