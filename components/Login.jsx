import { View,Text,Image,StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from './../constants/Colors.ts'
import { useRouter } from 'expo-router'

export default function Login() {
    const router = useRouter();
  return (
    <View style={{flex: 1}}>
    <Image source={require('./../assets/images/login.jpg')}
        style={{ 
            width:'100%',
            height:450,

         }}
    />
    <View style={styles.container}>
        <Text style={{ 
            fontFamily:'outfit-bold',
            fontSize:32,
            textAlign:'center'
         }}>
            AI Travel Planner
        </Text>
        <Text style={{ 
            fontFamily:'outfit-regular',
            fontSize:16,
            color:Colors.GRAY,
            textAlign:'center',
            marginTop:20,
            padding:16

         }}>
        Your Smart Travel Assistant for Personalized & Perfect Itineraries on Every Journey
        </Text>
        <TouchableOpacity style={styles.button}
            onPress={()=>router.push('auth/sign-in')}    
        >
            <Text style={{ 
                color:Colors.WHITE,
                fontFamily:'outfit-medium',
                textAlign:'center',
                fontSize:20,
             }}>
                Get started
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
            onPress={()=>router.push('chatbot')}    
        >
            <Text style={{ 
                color:Colors.WHITE,
                fontFamily:'outfit-medium',
                textAlign:'center',
                fontSize:20,
             }}>
                Inbox Support
            </Text>
        </TouchableOpacity>

        
    </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.WHITE,
        marginTop:-20,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        height:'100%',
        padding:25

    },
    button:{
        backgroundColor:Colors.PRIMARY,
        padding:15,
        borderRadius:99,
        marginTop:'20'



    }

})
