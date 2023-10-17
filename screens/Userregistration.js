import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    ScrollView,
    PermissionsAndroid,
    Modal,
    TouchableNativeFeedback
    
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import {Picker} from '@react-native-picker/picker';
  import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
  const Userinfoform = ({navigation}) => {
    const [username, setusername] = useState('example1');
    const [ email,setEmail]=useState("example123@gmail.com");
    const [image, setImage] = useState();
    const [imagename, setimagename] = useState();
    const [phone,setPhone] = useState("9837673923");
    const [type, settype] = useState();
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [country, setcountry] = useState();
    const [bodytype, setbodytype] = useState();
    const [like, setlike] = useState();
    const [height, setheight] = useState();
    const [loading, setLoading] = useState(false);
    const [description,setdescription]=useState();
    const [ gender,setGender]=useState("male");
    const [ visible, setvisible]=useState(false)
      const [selectedState, setSelectedState] = useState(null);
      const [ connectivty,setconnectivity]=useState(false);
      const [ alusersarray , setallusersarray]=useState([])
  const [states, setStates] = useState([
    "Dehli","Maharashtra","Gujrat"
    // Add more states here...
  ]);
  useEffect(()=>{
    const fecthc =async()=>{
      
      const asyncdata = await AsyncStorage.getItem("Allusers");
      setallusersarray(JSON.parse(asyncdata));

    }
    NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      setconnectivity(state.isConnected);
    });
    
    // Unsubscribe

    fetch();
  },[])
  const [ statename,setstatename]=useState("");
  const [ how,sethow]=useState()
  const howyouknow= ["Linkdin","Friends","Job Portal","Others"];
    const indianMegaCities = [
      'Mumbai',
      'Delhi',
      'Bangalore',
      'Hyderabad',
      'Chennai',
      'Kolkata',
      'Pune',
      'Ahmedabad',
      'Jaipur',
      'Lucknow',
      'Surat',
      'Kanpur',
      'Nagpur',
      'Indore',
      'Thane',
      'Bhopal',
      'Vadodara',
      'Ludhiana',
      'Nashik',
      'Faridabad',
      'Meerut',
      'Rajkot',
      'Srinagar',
      'Aurangabad',
      'Dhanbad',
      'Amritsar',
      'Allahabad',
      'Ranchi',
      'Coimbatore',
      'Jabalpur',
      'Vijayawada',
      'Jodhpur',
      'Madurai',
      'Kota',
      'Chandigarh',
      'Guwahati',
      'Solapur',
    ];
    const register = async()=>{
      setLoading(true);
      const obj = {     name:username,
        email:email,
        phone:phone,
        city:country,
        state:statename,
        gender:gender,
        how_did_you:how}
      const asyncs= await AsyncStorage.getItem("Allusers");
 if(asyncs){
  const json = JSON.parse(asyncs);
  const newarrrya= [...json,obj];
  AsyncStorage.setItem("Allusers",JSON.stringify(newarrrya));
 }
 else{
  const array = [ obj];
  AsyncStorage.setItem("Allusers",JSON.stringify(array));

 }
      try {
      
        const {data} =await axios.post("https://mindfull-gurukull.onrender.com/register",{
          name:username,
          email:email,
          phone:phone,
          city:country,
          state:statename,
          gender:gender,
          how_did_you:how
  
        });
        if(data.success==false){
          alert("User Already Exist")
          setLoading(false);
        }
        else{
          console.log(data.success);
          setLoading(false);
          navigation.navigate("Home");
        }
       
      } catch (error) {
        console.log(error);
        // alert(error);
        navigation.navigate("Home");

        setLoading(false)
      }
    }
    return (
      <LinearGradient   colors={['#7ea89c', '#68ab98','#5cbda2']} style={{flex: 1,height:"100%"}}>
        <ScrollView>
          <View
          
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,.5)',
                width: '100%',
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection:"row"
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
               
                }}>
                User Detail  -
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  marginLeft:5,
                 color: "white"
               
                }}>
                {connectivty?"Online Mode":"Offline Mode"}
              </Text>
              
            </View>
            <TextInput
              style={[styles.textinput, {paddingHorizontal: 15, marginTop: 30}]}
              value={username}
              placeholder="Name"
              placeholderTextColor={'rgba(255,255,255,.7)'}
              onChangeText={text => setusername(text)}></TextInput>
                    <TextInput
              style={[styles.textinput, {paddingHorizontal: 15}]}
              value={email}
              placeholder="email"
              placeholderTextColor={'rgba(255,255,255,.7)'}
              onChangeText={text => setEmail(text)}></TextInput>
            <TextInput
              keyboardType="numeric"
              style={[styles.textinput, {paddingHorizontal: 15}]}
              value={phone}
              maxLength={10}
              placeholder="Phone number"
              placeholderTextColor={'rgba(255,255,255,.7)'}
              onChangeText={text => setPhone(text)}></TextInput>

  

<Text style={{color:"white",fontSize:16,marginRight:"auto",marginLeft:30,marginTop:20}}>Gender</Text>

            <View style={{ marginTop: 10, marginBottom: 20 }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity
          style={[
            styles.genderOption,
            gender === 'male' && { backgroundColor: 'rgba(255,255,255,.3)' },
          ]}
          onPress={() => setGender('male')}
        >
          <Text style={styles.genderText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderOption,
            gender === 'female' && { backgroundColor: 'rgba(255,255,255,.3)' },
          ]}
          onPress={() => setGender('female')}
        >
          <Text style={styles.genderText}>Female</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderOption,
            gender === 'others' && { backgroundColor: 'rgba(255,255,255,.3)' },
          ]}
          onPress={() => setGender('others')}
        >
          <Text style={styles.genderText}>Others</Text>
        </TouchableOpacity>
      </View>
    </View>     
          {  visible&&     
      
      <View style={{height:250,width:300,backgroundColor:"white",marginTop:-200,zIndex:100,}}>
       <ScrollView>
         {states.filter((item)=>item.includes(statename)).map((item)=>(
           <TouchableOpacity onPress={()=>{setstatename(item); setvisible(false)}} style={{height:35,backgroundColor:"rgba(0,0,0,.1)",margin:5,paddingHorizontal:5,borderRadius:5,paddingVertical:5}}>
             <Text style={{color:"black",fontSize:16}}>{item}</Text>
           </TouchableOpacity>
         ))}
       </ScrollView>
      </View>
      
     }
    
            <Picker
              selectedValue={country}
              onValueChange={setcountry}
              style={[styles.textinput, {borderRadius: 20}]}
              itemStyle={{borderRadius: 20, color: 'red'}}>
              <Picker.Item label="City" value="" />
              {indianMegaCities.map((countryName, index) => (
                <Picker.Item
                  key={index}
                  label={countryName}
                  value={countryName}
                />
              ))}
            </Picker>
 
            <TextInput
              style={[styles.textinput, {paddingHorizontal: 15,}]}
              value={statename}
              placeholder="State"
              placeholderTextColor={'rgba(255,255,255,.9)'}
              onChangeText={text => {setstatename(text); setvisible(true)}}></TextInput>
         
         <Picker
              selectedValue={how}
              onValueChange={sethow}
              style={[styles.textinput, {borderRadius: 20}]}
              itemStyle={{borderRadius: 20, color: 'red'}}>
              <Picker.Item label="How did you hear about this" value="" />
              {howyouknow.map((countryName, index) => (
                <Picker.Item
                  key={index}
                  label={countryName}
                  value={countryName}
                />
              ))}
            </Picker>
            
       
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 100,
                height: 40,
                backgroundColor: '#d5c253',
                borderRadius: 10,
                borderWidth: 3,
                borderColor: 'rgba(255,255,255,.5)',
                marginTop: 30,
                marginBottom: 50,
              }}
              onPress={register}
              disabled={loading}>
              <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
                {loading ? <ActivityIndicator size="large" color="white" /> : 'Save'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

      </LinearGradient>
    );
  };
  const styles = StyleSheet.create({
    textinput: {
      width: '90%',
      height: 55,
      backgroundColor: 'rgba(0,0,0,.3)',
      // borderRadius:10,
      // borderWidth:.5,
      borderColor: 'rgba(255,255,255,.3)',
      marginVertical: 8,
      color: 'rgba(255,255,255,.9)',
      fontSize: 15,
    },
    genderOption: {
      width: 90,
      height: 35,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,.3)',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 10,
    },
    genderText: {
      fontSize: 13,
      color: 'white',
    },
  });
  
  export default Userinfoform;
  