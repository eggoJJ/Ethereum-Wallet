import React from 'react';
import {tryRun} from './eth/ethhelper';
import './shim.js';

import {Button, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
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
         paddingTop: 150
    },

    privateKeyText: {
         fontSize: 20,
         paddingRight: 250,
         paddingTop: 120
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
      top: 150,
      width: 200,
      right: 5,
      height: 42,
      backgroundColor: '#f0fff0',
      borderWidth: 2,
      borderColor: '#00fa9a'
    }
    
});
export default class App extends React.Component {
   
     state ={privateKeyNum: 0, publicKeyNum: 0};
     render() {
      return(
       <View style = {styles.titleView}> 
         <View style = {styles.keyBox1}>
           <Text>{this.state.publicKeyNum}</Text>
         </View>
         <View style = {styles.keyBox2}>
           <Text>{this.state.privateKeyNum}</Text>
         </View>
         <Text style =  {styles.titleText}>Ember Etherium Wallet</Text>
         <Text style= {styles.publicKeyText}>Public Key:</Text>
         <Text style= {styles.privateKeyText}>Private Key:</Text>
         <TouchableOpacity 
             onPress = {() => tryRun()}
             style = {styles.buttonBox}
             >
             <Text style = {{position: 'absolute', left: 25, bottom: 10}}>Generate Another One</Text>
         </TouchableOpacity>
       </View>
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

