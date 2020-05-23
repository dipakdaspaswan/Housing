import * as React from 'react';
import {Button, Text, TextInput, View, StyleSheet,TouchableOpacity,KeyboardAvoidingView,PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/Ionicons'



export default class Register extends React.Component {
  
  state={
      FirstName: '',
      LastName: '',
      Phone: '',
      currentLongitude: 'unknown',
      currentLatitude: 'unknown',
      loading:false
    }
    componentDidMount = () => {
        var that =this;
        //Checking for the permission just after component loaded
        if(Platform.OS === 'ios'){
          this.callLocation(that);
        }else{
          async function requestLocationPermission() {
            try {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
                  'title': 'Location Access Required',
                  'message': 'This App needs to Access your location'
                }
              )
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                //To Check, If Permission is granted
                that.callLocation(that);
              } else {
                alert("Permission Denied");
              }
            } catch (err) {
              alert("err",err);
              console.warn(err)
            }
          }
          requestLocationPermission();
        }    
       }
       callLocation(that){
        //alert("callLocation Called");
          Geolocation.getCurrentPosition(
            //Will give you the current location
             (position) => {
                const currentLongitude = JSON.stringify(position.coords.longitude);
                //getting the Longitude from the location json
                const currentLatitude = JSON.stringify(position.coords.latitude);
                //getting the Latitude from the location json
                that.setState({ currentLongitude:currentLongitude });
                //Setting state Longitude to re re-render the Longitude Text
                that.setState({ currentLatitude:currentLatitude });
                //Setting state Latitude to re re-render the Longitude Text
             },
             
             { enableHighAccuracy: true, timeout: 200, maximumAge: 1000 }
          );
          that.watchID = Geolocation.watchPosition((position) => {
            //Will give you the location on location change
              console.log(position);
              const currentLongitude = JSON.stringify(position.coords.longitude);
              //getting the Longitude from the location json
              const currentLatitude = JSON.stringify(position.coords.latitude);
              //getting the Latitude from the location json
             that.setState({ currentLongitude:currentLongitude });
             //Setting state Longitude to re re-render the Longitude Text
             that.setState({ currentLatitude:currentLatitude });
             //Setting state Latitude to re re-render the Longitude Text
          });
       }
       componentWillUnmount = () => {
          Geolocation.clearWatch(this.watchID);
       }
  
  onChangeHandle(state, value){
    this.setState({
      [state]:value
    })
  }

  register(){
    let collection = {}
    collection.FirstName = this.state.FirstName
    collection.LastName = this.state.LastName
    collection.Phone = this.state.Phone
    collection.currentLongitude = this.state.currentLongitude
    collection.currentLatitude = this.state.currentLatitude
    // console.warn(collection);

    var url = 'https:hss.habitatnepal.org/api/memberreg.php';
    const {FirstName, LastName, Phone} = this.state;
    if(FirstName && LastName && Phone){
    fetch(url, {
      method: 'POST', // or 'PUT'
      headers: new Headers( {
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(collection),
    })
    .then((response) => response.json())
    .then((res) => {
      alert(res)
    })
    .catch((error) => {
      alert(error)
    });
      }
      else{
        alert("Please enter your details")
    }
    }
   
  
  render(){
     const { UserCode, PassCode, loading} = this.state;
return (
    
  <KeyboardAvoidingView style={styles.container}>
  <TouchableOpacity
  onPress={()=>this.props.navigation.goBack()}>
        <Icon 
            name='md-arrow-back' size={50}
        />
    </TouchableOpacity>
  <Text style={styles.title}>Register</Text>
  <View style={styles.formWrapper}>
  <View style={styles.formRow}>
    <TextInput 
      style={styles.textInput}
      placeholder={'First Name'}
      placeholderTextColor="#333"
      keyboardType={'default'}
        value={UserCode}
        onChangeText = { (value) => this.onChangeHandle('FirstName', value) }
 
    />
    
  </View>
  <View style={styles.formRow}>
    <TextInput 
      style={styles.textInput}
      placeholder={'Last Name'}
      placeholderTextColor="#333"
      keyboardType={'default'}
        value={UserCode}
        onChangeText = { (value) => this.onChangeHandle('LastName', value) }
 
    />
    
  </View>
  <View style={styles.formRow}>
    <TextInput 
      style={styles.textInput}
      placeholder={'Phone Number'}
      maxLength={10}
      placeholderTextColor="#333"
      keyboardType={'phone-pad'}
        value={UserCode}
        onChangeText = { (value) => this.onChangeHandle('Phone', value) }
 
    />
    
  </View>
  
  
  <TouchableOpacity
    style={{...styles.signInBtn, backgroundColor: loading ? '#ddd' : "blue"}}
    onPress={()=>this.register()}
    disabled={loading}
    >
      <Text 
      style={styles.signInTxt}
      >{loading ? "Loading...": "Register"}</Text>
    </TouchableOpacity>
  </View>
 
  

  </KeyboardAvoidingView>

  );
}
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 48,
    fontSize:32,
    fontWeight:'bold'
  },
  input: {
    marginVertical: 8,
  },
  loginButton: {
    marginVertical: 32,
  },
  container:{
    height:'100%',
    justifyContent:'center',
    alignItems:'center'
  },
  formWrapper:{
    width:'90%',
  },
  formRow:{
    marginBottom:15
  },
  textInput:{
    backgroundColor:"#ddd",
    paddingHorizontal:10,
    height:60,
    borderRadius:8,
  },
  signInBtn:{
    backgroundColor:'blue',
    paddingVertical:18,
    borderRadius:8
  },
  signInTxt:{
    textAlign:"center",
    fontSize:18,
    color:"#fff"
  }
});