import React,{Component} from 'react'
import { View,Text,ScrollView,StyleSheet,TextInput, TouchableOpacity } from 'react-native';


class UselessTextInput extends Component {
  render() {
    return (
      <TextInput
        {...this.props} 
        editable = {true}
        placeholder="Type your message here"
        maxLength = {40}
      />
    );
  }
}


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TextInputName: '',
      TextInputNumber: '',
      TextInputMessage: ''
    };
  }

  submit(){
    let collection = {}
    collection.TextInputName = this.state.TextInputName
    collection.TextInputNumber = this.state.TextInputNumber
    collection.TextInputMessage = this.state.TextInputMessage
    // console.warn(collection);

    var url = 'https:hss.habitatnepal.org/api/message.php';
    fetch(url, {
      method: 'POST', // or 'PUT'
      headers: new Headers( {
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(collection),
    })
    .then((response) => response.json())
    .then((res) => {
      alert('Your message sent',res)
    })
    .catch((error) => {
      alert('No message sent', error)
    });
      }
  render(){
    return (
        <View style={styles.MainContainer}>
        <Text style={styles.headerTitle}>
          Message Box
        </Text>
        <ScrollView>
        <TextInput
          placeholder="Enter First Name"
          onChangeText={TextInputName => this.setState({ TextInputName })}
          underlineColorAndroid="transparent"
          style={styles.TextInput}
        />
        <TextInput
          placeholder="Phone Number"
          onChangeText={TextInputNumber => this.setState({ TextInputNumber })}
          underlineColorAndroid="transparent"
          keyboardType="phone-pad"
          style={styles.TextInput}
        />
         <View style={{
            backgroundColor: this.state.text,
            borderBottomColor: '#000000',
            borderBottomWidth: 1 }}
               >
       <UselessTextInput
         multiline = {true}
         numberOfLines = {4}
         onChangeText={(TextInputMessage) => this.setState({TextInputMessage})}
         value={this.state.text}
       />
     </View>

        <TouchableOpacity style={{height:50, alignItems:'center',justifyContent:'center',
          marginTop:50,backgroundColor:'grey'}}
              onPress={()=>this.submit()}
              >
            <Text>
                Submit
            </Text>
        </TouchableOpacity>
        
        </ScrollView>
        </View>
    )
}
}


const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      margin: 20,
    },
    TextInput: {
      width: '100%',
      height: 40,
      paddingLeft: 5,
      borderWidth: 1,
      marginTop: 15,
      borderColor: '#606070',
    },
    MessageBox:{
        width: '100%',
        paddingLeft: 5,
        borderWidth: 1,
        marginTop: 15,
        borderColor: '#606070',
    },

  headerTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    paddingVertical: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(00,00,80,1)',
  },
})