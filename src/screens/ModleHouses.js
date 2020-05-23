import React, { Component } from 'react';
import * as constant from "../helper/constant";
import { 
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,  
  ToastAndroid,
  Image,
  
} from 'react-native'


export default class ModleHouses extends Component {
  constructor(){
    super()
    this.state={
      dataSource:[],
      isLoading:true,
      modalVisible: false
    } 
  }
  renderItem =({item})=>{
    return(
      <TouchableOpacity style={{ flexDirection:'row',padding:10}}
      onPress={()=>{
        this.props.navigation.navigate('MoldeHouseDetails', {item: item}) }}
      >
      <View style={{flex:1 ,flexDirection:'row',alignItems:'center'}}>
      <Image 
      style={{height:80,width:80,borderRadius:50}}
        source={{uri:`${constant.API_BASE_URL}/uploads/${item.ModalImage}`}}/>
      <Text style={styles.ListText}>
        {item.ModalName}
      </Text>
      </View>
    </TouchableOpacity>
    )   
  }
  saperator=()=>{
    return(
      <View
      style={{height:1,width:"100%", backgroundColor:'black'}}>

      </View>
    )
  }
  
  componentDidMount(){
    const url=`${constant.API_BASE_URL}/api/modallist.php`
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
        <View >
        <Text style={styles.headerTitle} >
          Model Houses
        </Text>
        </View>
        <View style={{borderBottomColor:'#000',borderBottomWidth:1}}>
        <FlatList
        data= {this.state.dataSource }
         renderItem={this.renderItem}
         keyExtractor={(item, index)=>index}
         ItemSeparatorComponent={this.saperator}
        />
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1
  },
  headerTitle: {
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold',
    paddingVertical: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(25,20,20,1)',
  },
  ListText:{
    fontSize:20,
    fontWeight:'bold',
    marginLeft:10
  }
})