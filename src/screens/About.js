import React from 'react'
import { View,Text, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function About({navigation}) {
    return (
        <View style={styles.container}>
        <View>
         <Icon 
        onPress={()=>{
          navigation.goBack();
        }}
          name={'keyboard-backspace'} color={'white'} size={40}
          style={{backgroundColor:'#00A650', padding:10}}
        />
        <Text style={styles.headerTitle} >
            About Us
        </Text>
        </View>
        <Text style={{padding:15, textAlign:'justify',}}>
            
Habitat Nepal employs a holistic approach to achieve long-term shelter solutions by forging stronger partnerships with government agencies, strengthening relationships with local partners, leveraging government resources, and pursuing growth through housing microfinance and market development initiatives.
Our work is made possible by supporters who give generously of their time and resources. Every helping hand makes a difference and brings us closer to our vision.

        </Text>
        <Text style={{padding:15, textAlign:'justify'}} >
        This Android App is dedicated to increase awareness on safe shelter and available funding sources
(housing microfinance loans) including low cost constructions materials among low-income families.
The user groups will have opportunity to see various low-cost housing designs and required construction materials.
        </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{ 
      flex: 1,
  },
  headerTitle: {
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold',
      paddingVertical: 20,
      textAlign: 'center',
      backgroundColor: '#00A650',
    }, 
  });