import '../shim.js';
import {retPass} from './passhelper';
import {AsyncStorage} from "react-native";
//import {getGenericPassword} from 'react-native-keychain';

const wallet = require('eth-wallet-light')

const entropy = 'hydro' 
var keyt;


export async function initEth(){

    keyt = await retKey();
    console.log("Key3 ", keyt );
}

async function retKey(){
  let tok = '';
  try {
        tok = await AsyncStorage.getItem('KS') || 'none';
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
  console.log('tok: ', tok);
  if(tok == ''){
      return setKey();
  }
  else{
    var keystore = await new wallet.Keystore().restorefromSerialized(tok);
    return keystore;
  }
}
export async function setKey(){
    var keystore = await new wallet.Keystore().initializeFromEntropy(entropy, await retPass());
    let ser = keystore.serialize();
    try {
        await AsyncStorage.setItem('KS', ser);
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
      return keystore;
}



export async function getPKey(){
    if(keyt == null) return 0;
    else {
        return keyt.getPrivateKey(await retPass());
    }
}

export function getPub(){
    if(keyt == null) return 0;
    else{     
        return keyt.getAddress();
    }

}
    
/*
export default class myClass extends React.Component {
  #password: string;
  #keystore: var;
  constructor(pass, entropy) {
      this.#password = 'mypassword'
      this.#keystore = findKeyStore()
  }
  
  get PrivateKey(pass){
      if(pass.localeCompare(this.#password) != 0 ){
          return -1;
      }
      else return this.#keystore.getPrivateKey();
  }
  
 
  async findKeyStore(){
      //if file found
        //read file in (string serialization)
        //return string.ToKeyStore()
      try{
          const keyStoreCred = await Keychain.getGenericPassword(username,password); 
          if(keyStoreCred){
              console.log("user: " ,keyStoreCred.username);
              console.log("pass: ", keyStoreCred.password);
              // return keyStoreCred.pass.toKeyStore(); 
              
          }
          else{
              //return generateKeyStore
          }
      }
      catch(error){
          console.log("somethign went wrong");
      }
      return null;
      //else
        //return generateKeyStore 

  }
  

  async generateKeyStore(){
        console.log("made it here, no creds on file");
        var keystore = await new wallet.Keystore().initializeFromEntropy(entropy, password)
        // write to file
            // keystore.toString
        // return keystore
  }




}
*/

