import React,{Component} from "react";
import {Text,View,StyleSheet,Linking,Image} from "react-native";
import * as constant from '../helper/constant';


 export default class ContactDetails extends Component {
 
render(){
  let {item} = this.props.route.params;
return(
<View style={styles.container}>
    <Text style={styles.headerTitle}>{item.FirstName} {item.LastName}</Text>
    <View style={{padding:10}}>
    <Image
      style={{height:300,width:'100%'}}
       source={{uri:`${constant.API_BASE_URL}/uploads/${item.Photo}`}}/> 
    </View>
    <View style={{justifyContent:'center', backgroundColor:'black',alignItems:"center",padding:20}}>
        <Text style={{fontSize:25,fontWeight:'bold',color:'white'}}>Conatct Details</Text>
    </View>
      <View style={{padding:20,marginTop:10}}>
      <Text style={styles.textdata}>Name: {item.FirstName} {item.LastName} </Text>
        <Text onPress={()=>{Linking.openURL(`tel:${item.PhoneNo}`);}}style={styles.textdata}>Phone: {item.PhoneNo}</Text>
        <Text style={styles.textdata}>City: {item.City}</Text>
        <Text style={styles.textdata}>Email: {item.Email}</Text>      
        </View>
      
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
  textdata:{
    color:'#000',
    fontSize:20,
    borderBottomColor:'#000',
    borderBottomWidth:1
  }
});