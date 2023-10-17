import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  useColorScheme,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Keyboard,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import axios from "axios"

const LoginScreen = ({navigation}) => {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'dark' ? 'black' : 'white';
//   const auth = getAuth();/
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setusername] = useState();
  const [loading, setLoading] = useState(false);
  const [passwordshow, setpasswordshow] = useState(true);

  
  const [marginTop, setMarginTop] = React.useState(120);
  const [ token, settoken]=useState();
  const login = async()=>{
    setLoading(true)
    try {
   
     
    const {data}= await axios.post("https://mindfull-gurukull.onrender.com/login",{email,password});
    if(data.success==true){
      setLoading(false);
      AsyncStorage.setItem("admin","true");
      navigation.navigate("Home")
    }
    else{
      alert("wrong password")

    }
    console.log(data);  
    setLoading(false) 
    } catch (error) {
        console.log(error);
        setLoading(false);
        alert("Netowrk Error")
    }
}
  



  const styles = StyleSheet.create({
    Box: {
      marginLeft: 20,
      marginTop: marginTop,
      backgroundColor: 'rgba(0,0,0,.3)',
      borderRadius: 20,
      width: 320,
      height: 460,
    },
    LoginHeading: {
      color: 'white',
      marginLeft: 25,
      marginTop: 30,
      fontSize: 30,
      fontWeight: 'bold',
    },
    TextInputBox: {
      backgroundColor: 'rgba(0,0,0,.4)',
      marginHorizontal: 20,
      borderRadius: 20,
      marginTop: 40,
      paddingHorizontal: 15,
    },
    IconBox: {
      marginTop: 15,
      marginHorizontal: 50,
      backgroundColor: '#0D1D12',
      width: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
    ForgetText: {
      color: '#ffffff',
      textAlign: 'center',
      fontSize: 12,
      fontWeight: '300',
      marginTop: 15,
    },
    LoginButton: {
      backgroundColor: 'white',
      paddingHorizontal: 20,
      paddingVertical: 10,
      alignItems: 'center',
      width: 200,
      marginLeft: 55,
      borderRadius: 20,
      marginTop: 25,
    },
    LoginButtonText: {
      color: 'black',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={['#7ea89c', '#68ab98','#5cbda2']}
        style={{height: '100%'}}>
        <View style={styles.Box}>
          <Text style={styles.LoginHeading}>ADMIN LOGIN</Text>
          <View style={styles.TextInputBox}>
            <TextInput
              placeholder="User Email"
              placeholderTextColor={'rgba(255,255,255,.6)'}
              style={{color: 'white'}}
              onChangeText={text => setEmail(text)}
              value={email}
            />
          </View>
          <View
            style={[
              styles.TextInputBox,
              {
                marginTop: 15,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              },
            ]}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={'rgba(255,255,255,.6)'}
              style={{color: 'white', width: '90%'}}
              onChangeText={text => setPassword(text)}
              value={password}
              secureTextEntry={passwordshow}
            />
            <TouchableOpacity onPress={() => setpasswordshow(!passwordshow)}>
              <Ionicons
                name={passwordshow ? 'eye' : 'eye-off'}
                size={20}
                color="rgba(255,255,255,.8)"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity disabled={loading} onPress={login}  style={styles.LoginButton}>
            {loading ? (
              <ActivityIndicator size="large" color="black" />
            ) : (
              <Text style={styles.LoginButtonText}>Login</Text>
            )}
          </TouchableOpacity>
          {/* <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={[styles.ForgetText,{fontSize:16}]}> Don’t have an account?</Text>
            <TouchableOpacity onPress={gotosignup}>
              <Text
                style={[
                  styles.ForgetText,
                  {color: 'yellow', fontWeight: 'bold',fontSize:16},
                ]}>
                {' '}
                Sign Up
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </LinearGradient>
    </View>
  );
};

export default LoginScreen;
