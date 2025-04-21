import { View, Text,TextInput,ScrollView, StyleSheet,ImageBackground, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router'
import {Colors} from './../../../constants/Colors.ts'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router'
// import {  } from 'react-native-web';
export default function SignIn() {

const navigation = useNavigation();
const router = useRouter();
useEffect(()=>{
    navigation.setOptions({
        headerShown:false
    })
},[])


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
        fontSize:30,
        marginTop:30
     }}>
     Let's Sign You In !
    </Text>
    <Text style={{ 
        fontFamily:'outfit-regular',
        fontSize:30,
        color:Colors.GRAY,

        
     }}>
     Welcome Back
    </Text>
    <Text style={{ 
        fontFamily:'outfit-bold',
        fontSize:30,
        color:Colors.GRAY
     }}>
     Let's Sign You In !
    </Text>

    <View style={{ 
        marginTop:60,
     }}>
        <Text style={{ 
            fontFamily:'outfit-regular',
            fontSize:16
         }}>Email</Text>
        <TextInput style={styles.input}
         placeholder='Enter your email'></TextInput>
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
         placeholder='Enter your password'></TextInput>
    </View>


    <View style={{ 
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
      }}>Sign In</Text>

    </View>
    <TouchableOpacity 
        onPress={()=>router.replace('auth/sign-up')}  
        
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
      }}>Create Account</Text>

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

    },
   

   
})