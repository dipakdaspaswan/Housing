import React,{Component} from "react";
import {Text,View,StyleSheet,Alert,Image, ScrollView} from "react-native";
import WebView from 'react-native-webview';
import * as constant from '../helper/constant';

export default class ModleHouseDetails extends Component {
render(){
  const state = this.state;
  let {item} = this.props.route.params;
return(
   
<View style={styles.container}>
    <Text style={styles.headerTitle}>{item.ModalName}</Text> 
    <View style={{padding:10}}>
    <Image
      style={{height:200,width:'100%'}}
      source={{uri: `${constant.API_BASE_URL}/uploads/${item.ModalImage}`}}/> 
    </View>
    <ScrollView>

    <Text style={styles.HeadStyle}>
      Modle Discription
    </Text>
    <View style={{padding:10, flex:1 ,flexDirection:'column',height:580}}>
      
      {/* <Text style={{textAlign:'justify'}}>{item.ModalDesc}</Text> */}
      <WebView 
        scalesPageToFit={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{html: item.ModalDesc}} />          
      </View>
    <Text style={styles.HeadStyle}>
      Model Outline
    </Text>
   <View style={{flexDirection:'row',paddingLeft:50, alignItems:'center'}}>
    <Text style={{paddingRight:100,fontSize:20}}>
      -
    </Text>
    <Text style={{paddingRight:60,fontSize:20}}>
      Door
    </Text>
    <Text style={{fontSize:20}} >
      Window
    </Text>
   </View>
   <View style={{paddingLeft:40}}>
    <View style={{flexDirection:'row'}}>
    <Text style={{paddingTop:10,fontSize:17}}>
    Front
    </Text>
      <Text style={{textAlign:'center',justifyContent:'center',paddingTop:10,paddingLeft:90,fontSize:17}}> {item.DoorFront}</Text>
      <Text style={{textAlign:'center',justifyContent:'center',paddingTop:10,paddingLeft:90,fontSize:17}}> {item.WindowFront}</Text>
    </View>
    <View style={{flexDirection:'row'}}>
    <Text style={{paddingTop:10,fontSize:17}} >
    Back
    </Text>
    <Text style={{textAlign:'center',justifyContent:'center',paddingTop:10,paddingLeft:90,fontSize:17}}> {item.DoorBack}</Text>
    <Text style={{textAlign:'center',justifyContent:'center',paddingTop:10,paddingLeft:90,fontSize:17}}> {item.WindowBack}</Text>
    </View>
    <View style={{flexDirection:'row'}}>
    <Text style={{paddingTop:10,fontSize:17}} >
    Left
    </Text>
    <Text style={{textAlign:'center',justifyContent:'center',paddingTop:10,paddingLeft:97,fontSize:17}}> {item.DoorLeft}</Text>
    <Text style={{textAlign:'center',justifyContent:'center',paddingTop:10,paddingLeft:92,fontSize:17}}> {item.WindowLeft}</Text>
    </View>
    <View style={{flexDirection:'row'}}>
    <Text style={{paddingTop:10,fontSize:17}} >
    Right
    </Text>
    <Text style={{textAlign:'center',justifyContent:'center',paddingTop:10,paddingLeft:85,fontSize:17}}> {item.DoorRight}</Text>
    <Text style={{textAlign:'center',justifyContent:'center',paddingTop:10,paddingLeft:90,fontSize:17}}> {item.WindowRight}</Text>
    </View>
    </View> 
     <View style={{backgroundColor:'black',alignItems:'center',marginTop:10,padding:20}}>
     <Text style={{color:'white',fontSize:20}}>
     Approx Price Value: Rs.{item.ApproxValue}
     </Text>
     </View>
     </ScrollView>
</View>
);
}
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
    backgroundColor: 'rgba(25,20,20,1)',
  },
  texts:{
      fontSize:15
  },
  HeadStyle: {
    marginLeft:10,
    fontSize:18,
    fontWeight:'bold',
    alignContent: "center",
    backgroundColor: '#ffe0f0'
  },
  TableText: { 
    margin: 10
  }
});