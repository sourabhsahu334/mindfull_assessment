import { View, Text, TouchableOpacity, Dimensions, Modal, ScrollView,ActivityIndicator,ToastAndroid, TextInput } from 'react-native'
import React, { cloneElement, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import NetInfo from "@react-native-community/netinfo";
import axios from 'axios';

const Home = () => {

  const [isusers,setIsusers]=useState(false);
  const navigation = useNavigation();
  const [ alluserarray , setalluserarray ]=useState([]);
  const [ pagenumber ,setPagenumber]=useState(0);
  const [ connectivty,setconnectivity]=useState(false);
  const [ temporaryobj,setTemporaryobj]=useState();
  const [ name , setName]=useState();
  const [ phone,setPhone]=useState();
  const [ role,setrole]=useState();
  const [ loading,setLoading]=useState(false);
  useEffect(()=>{
    const sendata = async()=>{
      try {
        setLoading(true)
        const data= await AsyncStorage.getItem("Allusers");
      const json = JSON.parse(data);
        const data2 = await axios.post ("https://mindfull-gurukull.onrender.com/registerall",{array:json});
        console.log(data2.data);
        setLoading(false)
      
      } catch (error) {
        console.log("error",error);
        setLoading(false)
      }
      
    }
    sendata();
  },[connectivty]);

  useEffect(()=>{
    const sendata = async()=>{
      setLoading(true)
      try {
        const data= await AsyncStorage.getItem("Allusers");
      const json = JSON.parse(data);
        const data2 = await axios.post ("https://mindfull-gurukull.onrender.com/registerall",{array:json});
        console.log(data2.data);
        setLoading(false);
      
      } catch (error) {
        console.log("error",error);
        setLoading(false);
      }
      
    }
    sendata();
  },[])

  useEffect(()=>{
    NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      setconnectivity(state.isConnected);
    });
//     const fetch =async()=>{
//    const users = await AsyncStorage.getItem("Allusers");
//    if(users)
// {
//   setIsusers(true);
//   setalluserarray(JSON.parse(users));
//   console.log(users)
// }    
// else{
//   setIsusers(false)
// }
// }
fetch();
  },[]);
  useFocusEffect(
    React.useCallback(() => {
      const fetch =async()=>{
        const users = await AsyncStorage.getItem("Allusers");
        if(users)
     {
       setIsusers(true);
       setalluserarray(JSON.parse(users));
       
       console.log(users)
     }    
     else{
       setIsusers(false)
     }
     }
      fetch();
    }, [])
  );
  useEffect(()=>{
    const fetch =async()=>{
       if(connectivty){
        try {
          const {data}=await axios.get("https://mindfull-gurukull.onrender.com/allusers");
          const users = await AsyncStorage.getItem("Allusers");
          const json= users?JSON.parse(users):[]
       console.log(data.data,users);
        if (data.success){
          console.log(true);
          if(data.data.length>0){
            setIsusers(true)
          }
          const filteredNewData = data.data.filter((newItem) => {
            if(users){
              return !json.some((existingItem) => existingItem.email === newItem.email);

            }
            else{
              return data.data
            }
          });
          setalluserarray([...json,...filteredNewData]);
          const obj = [ ...json,...filteredNewData]
          AsyncStorage.setItem("Allusers",JSON.stringify(obj));
        }
        } catch (error) {
      //  ToastAndroid.show(error,ToastAndroid.SHORT);
       console.log(error)
        }
       }     
    }
    fetch();
  },[connectivty]);
  const save=async()=>{
    
  };
  const uniqueEmails = new Set();
  const filteredUsers = alluserarray.filter((user) => {
    // Check if the email is not already in the Set (i.e., it's unique)
    if (!uniqueEmails.has(user.email)) {
      uniqueEmails.add(user.email); // Add the email to the Set
      return true; // Keep the user in the filtered array
    }
    return false; // Duplicate email, exclude from the filtered array
  });
  return (
    <View style={{flex:1,height:"100%",backgroundColor:"white"}}>
    <View style={{width:"100%",height:40,backgroundColor:"rgba(0,0,0,.5)",justifyContent:"center",alignItems:"center"}}>
      <Text style={{fontSize:19,fontWeight:"bold",color:"white"}}>DASHBOARD  {connectivty?"ONLINE MODE":"OFFLINE MODE"}</Text>
    </View>
     {loading&&<View style={{flexDirection:'row',justifyContent:"center",alignItems:"center",marginTop:20,paddingHorizontal:20}}>
      <ActivityIndicator color={"black"} size={"large"}/>
      <Text style={{fontSize:18,marginLeft:20}}>Syncing From the database...</Text>
     </View>}
    
{  !isusers&&  <Text style={{fontSize:18,marginTop:40,marginLeft:20}}>No Data Available !</Text>
}   
 <ScrollView style={{marginTop:30}}>
      {alluserarray&& filteredUsers.map((item,index)=>(
           <View key={index}>
           <TouchableOpacity onPress={()=>{if(temporaryobj==index+1){
          setTemporaryobj("")
        }
        else{
          setTemporaryobj(index+1)
        }}
        } style={{backgroundColor:"#bfebd8",height:60,width:"95%",marginHorizontal:10,borderRadius:10,marginVertical:5,paddingHorizontal:5,paddingVertical:5,flexDirection:'row',alignItems:'center'}}>
        <View style={{color:"black",fontSize:15.5,fontWeight:"bold",backgroundColor:"rgba(0,0,0,.1)",height:25,width:25,borderRadius:15,justifyContent:"center",alignItems:"center",marginLeft:10}}>        
        <Text style={{color:"black",fontSize:15.5,fontWeight:"bold",}}>{index+1}</Text>
</View>

        <Text style={{color:"black",fontSize:15.5,fontWeight:"bold",marginLeft:20}}>{item.email}</Text>
    
        </TouchableOpacity>
        {temporaryobj==index+1&&<View style={{backgroundColor:"white",width:"95%",height:220,marginHorizontal:10}}>
          <TextInput
             value={item.name}
             onChangeText={(text)=>setName(text)}
             style={{color:"black",borderRadius:5,paddingHorizontal:5,borderColor:"black",backgroundColor:"rgba(0,0,0,0.1)"}}
          />
          <TextInput
             value={item.phone}
             onChangeText={(text)=>setPhone(text)}
             style={{color:"black",borderRadius:5,paddingHorizontal:5,borderColor:"black",backgroundColor:"rgba(0,0,0,0.1)",marginTop:10}}
          />
                    <TextInput
             value={item.city}
             onChangeText={(text)=>setName(text)}
             style={{color:"black",borderRadius:5,paddingHorizontal:5,borderColor:"black",backgroundColor:"rgba(0,0,0,0.1)",marginTop:10}}
          />
          <TouchableOpacity style={{justifyContent: 'center',
                alignItems: 'center',
                width: 80,
                height: 30,
                backgroundColor: '#d5c253',
                borderRadius: 10,
                borderWidth: 3,
                borderColor: 'rgba(255,255,255,.5)',
                marginTop: 10,
                marginBottom: 50,}}>
                  <Text onPress={()=>{}} style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>Save</Text>
                </TouchableOpacity>
        </View>}
           </View>
      ))}
    </ScrollView>
    {/* {!alluserarray.length>10&&<ActivityIndicator color={"black"} size={"large"}/>} */}
    <TouchableOpacity onPress={()=>navigation.navigate("Userregister")} style={{height:60,width:60,borderRadius:30,justifyContent:"center",alignItems:"center",backgroundColor:"#5cbda2",marginLeft:"auto",position:"absolutes",marginRight:20,marginBottom:20}}>
      <Text style={{fontSize:45,fontWeight:"bold",color:"white"}}>+</Text>
    </TouchableOpacity>

    </View>
  )
}

export default Home