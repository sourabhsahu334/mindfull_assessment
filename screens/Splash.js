import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { Image, StyleSheet, View,Text } from 'react-native';
import Svg, { Path, TSpan, TextPath,G ,Circle,Text as SvgText} from 'react-native-svg';

import ReactCurvedText from 'react-curved-text';
const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    const checkUserAsync=async()=>{
        const user = await AsyncStorage.getItem("admin")
        if(user){
            navigation.replace("Home")
        }
        else{
            navigation.replace("Login");
        }
    }
 
    // Simulate a loading process
    setTimeout(checkUserAsync, 2000);
  }, [navigation]);

  return (
    <View style={styles.container}>
            
              <Image   source={require("../assets/images/Mindfulness.png")} style={[styles.image,{marginTop:50}]}/>

      <Svg position="absolute" height="400" width="400"
          viewBox="0 0 300 300">
          <G id="circle">
            <Circle
              r={75}
              x={150}
              y={176}
              fill="none"
              stroke="#fff"
              strokeWidth={14}
              transform="rotate(-145)"
            />
          </G>
          <SvgText fill="white" fontSize="16" fontWeight={"bold"}>
            <TextPath href="#circle">
              <TSpan dx="13" dy={-30}>
Mindfull Gurukul 
              </TSpan>
            </TextPath>
          </SvgText>
        </Svg>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#5cbda2"
  },
  image: {
    width: 200,
    height: 200,
    
    borderRadius:140,
    backgroundColor:"white",
    justifyContent:"center",
    alignItems:"center"
  },
});

export default SplashScreen;
