import {DrawerContentScrollView} from "@react-navigation/drawer";
import {Image, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {connect} from "react-redux";
import React from "react";

class CustomDrawerContent extends React.Component {
  render() {
    return (
      <DrawerContentScrollView>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image style={{width: '80%', marginTop: 30}}
                 source={require('../images/Logo.png')}/>

          <Text>{`${this.props.user.firstName} ${this.props.user.lastName}`}</Text>
        </View>

        <View style={{paddingTop: 20}}>

          <View style={{padding: 10, flexDirection: 'row', paddingRight: 170}}>

            <TouchableOpacity style={{flexDirection: 'row'}}
                              onPress={() => this.props.navigation.navigate('About')}>
              <Icon name="md-contacts" size={30} color='#000'/>
              <Text style={{paddingLeft: 15, fontSize: 20, color: '#000'}}>About Us</Text>
            </TouchableOpacity>

          </View>

          <View style={{padding: 10, flexDirection: 'row', paddingRight: 165}}>

            <TouchableOpacity style={{flexDirection: 'row', paddingTop: 15}}
                              onPress={() => this.props.navigation.navigate('Videos')}>
              <Icon name="ios-videocam" size={30} color="#000"/>
              <Text style={{paddingLeft: 10, fontSize: 20, color: '#000'}}>Videos</Text>
            </TouchableOpacity>

          </View>

          <View style={{padding: 10, flexDirection: 'row', paddingRight: 175}}>

            <TouchableOpacity style={{flexDirection: 'row', paddingTop: 15}}
                              onPress={() => this.props.navigation.navigate('Audio')}>
              <Icon name="md-musical-note" size={30} color="#000"/>
              <Text style={{paddingLeft: 10, fontSize: 20, color: '#000'}}>Audios</Text>
            </TouchableOpacity>

          </View>
          <View style={{padding: 10, flexDirection: 'row', paddingRight: 167}}>
            <TouchableOpacity style={{flexDirection: 'row', paddingTop: 15}}
                              onPress={() => this.props.navigation.navigate('Pamphlet')}>
              <Icon name="ios-image" size={30} color="#000"/>
              <Text style={{paddingLeft: 10, fontSize: 20, color: '#000'}}>Pamphlet</Text>
            </TouchableOpacity>
          </View>
          <View style={{padding: 10, flexDirection: 'row', paddingRight: 167}}>
            <TouchableOpacity style={{flexDirection: 'row', paddingTop: 15}}
                              onPress={() => this.props.navigation.navigate('Suppliers')}>
              <Icon name="md-cart" size={30} color="#000"/>
              <Text style={{paddingLeft: 10, fontSize: 20, color: '#000'}}>Suppliers</Text>
            </TouchableOpacity>
          </View>
          <View style={{padding: 10, flexDirection: 'row', paddingRight: 145}}>
          <TouchableOpacity style={{flexDirection: 'row', paddingTop: 15}}
                              onPress={() => this.props.navigation.navigate('Contacts')}>
              <Icon name="ios-contact" size={30} color="#000"/>
              <Text style={{paddingLeft: 10, fontSize: 20, color: '#000'}}>Contacts</Text>
            </TouchableOpacity>
          </View>
          <View style={{padding: 10, flexDirection: 'row', paddingRight: 145}}>
          <TouchableOpacity style={{flexDirection:'row',paddingTop:15}}
          onPress={()=>this.props.navigation.navigate('Technical')}>
            <Icon name="ios-call" size={30} color="#000"/>
            <Text style={{paddingLeft:10, fontSize:20, color:'#000'}}>For Support</Text>
          </TouchableOpacity>
          </View>

        </View>
      </DrawerContentScrollView>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  token: state.user.token,
});

export default connect(mapStateToProps)(CustomDrawerContent);
