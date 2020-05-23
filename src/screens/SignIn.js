import * as React from 'react';
import {Button, Text, TextInput, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {connect} from 'react-redux';
import {api_instance} from "../services/api";
import * as user_actions from "../actions/user_actions";

export class SignIn extends React.Component {
  state = {
    Phone: '',
    loading: false
  }

  onChangeHandle(state, value) {
    this.setState({
      [state]: value
    })
  }

  save_to_local_storage = async (token) => {
    await AsyncStorage.setItem('token', token);
  };

  login () {
    const {Phone} = this.state;
    if (Phone) {
      axios.post(`https://hss.habitatnepal.org/api/memberlogin.php?Phone=${Phone}`)
        .then(
          res => {
            this.setState({
              loading: false
            })
            let data = res.data[0];
            // console.warn(data);

            if (data && data.AuthToken) {
              let token = data.AuthToken;
              // let user = data.user;

              let user = {
                firstName: "Dipak",
                lastName: "Paswan"
              }

              this.save_to_local_storage(token);

              // for api
              api_instance.defaults.headers['Authorization'] = `Token ${token}`;

              // save token via redux
              this.props.dispatch(user_actions.set_token(token));

              // save user object
              this.props.dispatch(user_actions.set_current_user(user));

              // this.props.navigation.navigate('Home');

            } else {
              alert("Something went wrong")
            }

          },
          err => {
            alert(err)
          }
        )
    } else {
      alert("Enter your phone number")
    }


  }

  render() {
    const {Phone, loading} = this.state;
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.formWrapper}>
          <View style={styles.formRow}>
            <TextInput
              style={styles.textInput}
              placeholder={'Enter Phone Number'}
              placeholderTextColor="#333"
              keyboardType={'phone-pad'}
              maxLength={10}
              value={Phone}
              onChangeText={(value) => this.onChangeHandle('Phone', value)}

            />
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              style={{...styles.signInBtn, backgroundColor: loading ? '#ddd' : "blue"}}
              onPress={() => this.login()}
              disabled={loading}
            >
              <Text
                style={styles.signInTxt}
              >{loading ? "Loading..." : "SignIn"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.signInBtn, backgroundColor: loading ? '#ddd' : "blue"}}
              onPress={() => this.props.navigation.push('Register')}
              disabled={loading}
            >
              <Text
                style={styles.signInTxt}
              >{loading ? "Loading..." : "SignUp"}</Text>
            </TouchableOpacity>

          </View>

        </View>
      </KeyboardAvoidingView>

    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 50,
    fontSize: 32,
    fontWeight: 'bold'
  },
  input: {
    marginVertical: 8,
  },
  loginButton: {
    marginVertical: 32,
  },
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  formWrapper: {
    width: '90%',
  },
  formRow: {
    marginBottom: 15
  },
  textInput: {
    backgroundColor: "#ddd",
    paddingHorizontal: 10,
    height: 60,
    borderRadius: 8,
  },
  signInBtn: {
    backgroundColor: 'blue',
    paddingVertical: 18,
    borderRadius: 8,
    padding: 52,
    marginHorizontal: 20
  },
  signInTxt: {
    textAlign: "center",
    fontSize: 18,
    color: "#fff"
  }
});


const mapStateToProps = state => ({});

export default connect(mapStateToProps)(SignIn);
