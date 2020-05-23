import React, { Component } from 'react';
import * as constant from "../helper/constant";
import { 
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image
} from 'react-native';
import Lightbox from "react-native-lightbox"

const activeProps = {
   resizeMode: 'contain',
   flex: 1,
   width: null
};

export default class Pamphlet extends Component {
  constructor(){
    super()
    this.state={
      dataSource:[],
      isLoading:true
    } 
  }
  renderItem =({item})=>{
    
    return(
      <View style={{flex:1,  padding:10,borderBottomColor:'#000', borderBottomWidth:1}}>
      <View style={{paddingLeft:20}}>
        <Text style={{fontSize:16, fontWeight:'bold'}}>
        {item.CaptionName}
         </Text>
      
      <Lightbox 
      activeProps = {activeProps}
      >
		<Image
      style={{height:190,width:80,}}
      source={{uri: `https://hss.habitatnepal.org/uploads/Posture/${item.PostureImage}`}}
      />
      </Lightbox>
        
         <Text>
           {item.PostureName}
         </Text>
         
        </View>

      
    </View>
    )   
  }
  saperator=()=>{
    return(
      <View
      style={{height:1,width:"100%", backgroundColor:'black'}}
      >
      </View>
    )
  }
  
  componentDidMount(){
    
    const url=`${constant.API_BASE_URL}/api/posture.php`
    fetch(url).then((response)=>response.json())
    .then((responseJson)=>{
      this.setState({
        dataSource:responseJson,
        isLoading:false
      })
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  render() {
    return (
      this.state.isLoading
      ?
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" color="black" />
      </View>
      :
      <View style={styles.container}>
        <Text style={styles.headerTitle} >
         Posters / Pamphlets
        </Text>
        <FlatList
        data= {this.state.dataSource }
         renderItem={this.renderItem}
         keyExtractor={(item, index)=>index}
         
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,  
  },
  headerTitle: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    paddingVertical: 20,
    textAlign: 'center',
    backgroundColor: '#00A658',
  },
   col: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    height:150,
    width:'100%'
  },
  contain: {
    flex: 1,
    height: 1,
  },
})	