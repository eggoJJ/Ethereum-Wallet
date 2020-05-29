import {Alert, AsyncStorage} from "react-native";


export function passRun(){

    Alert.alert(
        'Alert Title',
        'My Alert Msg',
        [
          {
            text: 'Ask me later',
            onPress: () => console.log('Ask me later pressed')
          },
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
  );
}

export function checkValidity(p1,p2){

    if(p1== p2){
      syncPass(p1);
      return 1;
    }
    else{
      return 0;
    }
}

async function syncPass(p1){
      try {
        await AsyncStorage.setItem('p1', p1);
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
}
export function checkExist(p1){
  let num =  retrievePass(p1);
  return num;
}

export async function retPass(){
  let tok = '';
  try {
        token = await AsyncStorage.getItem('p1') || 'none';
        
      } catch (error) {
        // Error retrieving data
      }

  return tok;
}
async function retrievePass(p1){
    let token = '';
    console.log("p3:? ", p1);
    try {
        token = await AsyncStorage.getItem('p1') || 'none';
        
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
      if(token == p1) return 1;
      else return 0;
      
}

