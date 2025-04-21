import { View, Text,TextInput, StyleSheet,Image, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import {Colors} from './../../../constants/Colors.ts'
import { useRouter } from 'expo-router'
import{auth} from './../../../configs/FireBaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SignUp() {
 
 const navigation = useNavigation();
 const router = useRouter();
 const [email,setEmail] = useState('');
 const [password,setPassword] = useState('');
 const [fullname,setFullname] = useState('');

 useEffect(()=>{
     navigation.setOptions({
         headerShown:false
     })
 },[])
 
 const OnCreateAccount = () => {

    if(!(email?.length > 0 && password?.length > 0 && fullname?.length > 0)){
        ToastAndroid.show('Please fill all the fields',ToastAndroid.BOTTOM); 
        return;
    }
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    console.log(fullname,email,password);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    ToastAndroid.show(errorMessage,ToastAndroid.BOTTOM);
    console.log(errorCode,errorMessage);
    // ..
  });

 }
 
   return (
     <View style={{ 
         padding:25,
         // marginTop:40,
         backgroundColor:Colors.WHITE,
         height:'100%',
         paddingTop:40,
         

      }}>
    
    <TouchableOpacity onPress={()=>router.back()}>
    <Ionicons name="arrow-back" size={24} color="black" />
     </TouchableOpacity>
 
     <Text style={{ 
         fontFamily:'outfit-bold',
         fontSize:32,
         marginTop:40
      }}>
      Create An Account !
     </Text>
     <Text style={{ 
         fontFamily:'outfit-regular',
         fontSize:30,
         color:Colors.GRAY,
 
         
      }}>
      Start New Trip
     </Text>
     <Text style={{ 
         fontFamily:'outfit-bold',
         fontSize:30,
         color:Colors.GRAY,
         
         
      }}>
      Let's Gooo
     </Text>
 
     <View style={{ 
         marginTop:60,
      }}>
         <Text style={{ 
             fontFamily:'outfit-regular',
             fontSize:16
          }}>FullName</Text>
         <TextInput style={styles.input}
          placeholder='Enter your Fullname' 
          onChangeText={(text)=>setFullname(text)}>
           
          </TextInput>
     </View>
     <View style={{ 
         marginTop:10,
      }}>
         <Text style={{ 
             fontFamily:'outfit-regular',
             fontSize:16
          }}>Email</Text>
         <TextInput style={styles.input}
          placeholder='Enter your email'   
          onChangeText={(text)=>setEmail(text)}>
          
          </TextInput>
     </View>
 
     <View style={{ 
         marginTop:10,
      }}>
         <Text style={{ 
             fontFamily:'outfit-regular',
             fontSize:16
          }}>Password</Text>
         <TextInput
         secureTextEntry={true}
          style={styles.input}
          placeholder='Enter your password'  
          onChangeText={(text)=>setPassword(text)}>
          </TextInput>
     </View>
 
 
     <TouchableOpacity onPress={OnCreateAccount} style={{ 
         padding:20,
         borderRadius:20,
         backgroundColor:Colors.PRIMARY,
         marginTop:50
         
      }}>
      <Text style={{ 
         color:Colors.WHITE,
         textAlign:'center',
         fontFamily:'outfit-medium',
         fontSize:16
       }}>Create An Account</Text>
 
     </TouchableOpacity>
    <TouchableOpacity 
            onPress={()=>router.replace('auth/sign-in')}  
            
            style={{ 
            padding:20,
            borderRadius:20,
            backgroundColor:Colors.WHITE,
            marginTop:10,
            borderWidth:1
            
         }}>
         <Text style={{ 
            color:Colors.PRIMARY,
            textAlign:'center',
            fontFamily:'outfit-medium',
            fontSize:16
          }}>Sign In</Text>
    
        </TouchableOpacity>
     </View>
 
     
     
   )
 }
 
 const styles = StyleSheet.create({
     input:{
         padding:15,
         borderWidth:1,
         borderRadius:20,
         borderColor:Colors.GRAY,
         marginTop:10
 
     }
 })