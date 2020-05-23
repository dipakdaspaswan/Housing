import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  Text,
  View,
  Alert,
  Picker,
  TouchableOpacity,
  ScrollView,
  Button,
  Image
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class CashFlowAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TextInputFName: '',
      TextInputLName: '',
      choosenLabel: '', 
      choosenindex: '',
      spouseName:'',
      fatherName:'',
      fatherInLaw:'',
      familyCount:'0',
      filePath: {},
      provinces: [],
      selected_province: "",
      districts: [],
      selected_district: "",
      pension:'0',
      salary:'0',
      remittance:'0',
      agricultureCashCrops:'0',
      agricultureFoodCrops:'0',
      animalSales:'0',
      poultrySales:'0',
      businessIncome:'0',
      otherIncome:'0',
      agriferti:'0',
      agriTools:'0',
      agriOther:'0',
      animalHusbendry:'0',
      foodExp:'0',
      utilityExp:'0',
      phoneMob:'0',
      rentExp:'0',
      transport:'0',
      clothing:'0',
      medical:'0',
      education:'0',
      loanInstallment:'0',
      OtherExp:'',
      // vdcs:[],
      // selected_vdc:"",
    };
  }

  componentDidMount() {
     return fetch('https://hss.jeevanbikasdairy.com/api/provincelist.php')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          provinces: responseJson
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getDistricts = (province_id) => {
    return fetch(`https://hss.jeevanbikasdairy.com/api/districtlist.php?provinceID=${province_id}`)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        districts: responseJson
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  // getVdc = (district_id) => {
  //   return fetch(`https://hss.jeevanbikasdairy.com/api/vdclist.php?DistrictID=${district_id}`)
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     this.setState({
  //       isLoading: false,
  //       vdcs: responseJson
  //     });
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  // }



  chooseFile = () => {
    var options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'null',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        // let source = response;
        // You can also display the image using data:
        let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          filePath: source,
        });
      }
    });
  };

  submit(){
    let collection = {}
    collection.TextInputFName = this.state.TextInputFName    
    collection.TextInputLName = this.state.TextInputLName    
    collection.choosenLabel = this.state.choosenLabel     
    collection.spouseName = this.state.spouseName
    collection.fatherName = this.state.fatherName   
    collection.fatherInLaw = this.state.fatherInLaw  
    collection.familyCount = this.state.familyCount  
    collection.filePath = this.state.filePath  
    collection.selected_province = this.state.selected_province 
    collection.selected_district = this.state.selected_district
    collection.pension = this.state.pension   
    collection.salary = this.state.salary   
    collection.remittance = this.state.remittance  
    collection.agricultureCashCrops = this.state.agricultureCashCrops   
    collection.agricultureFoodCrops = this.state.agricultureFoodCrops   
    collection.animalSales = this.state.animalSales  
    collection.poultrySales = this.state.poultrySales   
    collection.businessIncome = this.state.businessIncome  
    collection.otherIncome = this.state.otherIncome   
    collection.agriferti = this.state.agriferti  
    collection.agriTools = this.state.agriTools   
    collection.agriOther = this.state.agriOther   
    collection.animalHusbendry = this.state.animalHusbendry   
    collection.foodExp = this.state.foodExp  
    collection.utilityExp = this.state.utilityExp   
    collection.phoneMob = this.state.phoneMob  
    collection.rentExp = this.state.rentExp   
    collection.transport = this.state.transport   
    collection.clothing = this.state.clothing   
    collection.medical = this.state.medical   
    collection.education = this.state.education   
    collection.loanInstallment = this.state.loanInstallment  
    collection.OtherExp = this.state.OtherExp       
    // console.warn(collection);
    var url = `https://hss.jeevanbikasdairy.com/api/cashflow.php`;
    fetch(url, {
      method: 'POST', // or 'PUT'
      headers: new Headers( {
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(collection),
    })
    .then((response) => response.json())
    .then((res) => {
      alert('Data Posted')
    })
    .catch((error) => {
      alert("no data found")
    });
    
  }
  CheckTextInput = () => {
    //Handler for the Submit onPress
    if (this.state.TextInputName != '') {
      //Check for the Name TextInput
      if (this.state.TextInputEmail != '') {
        //Check for the Email TextInput
        alert('Success')
      } else {
        alert('Please Enter Email');
      }
    } else {
      alert('Please Enter Name');
    }
  };
  render() {
    return (        
        <View style={styles.MainContainer}>
        <Text style={styles.headerTitle}>
          Cash Flow Analysis
        </Text>
        <View style={{padding:10}}>
        
        <ScrollView>
          <View style={{backgroundColor:'#9dc3c7', padding:10, marginTop:5}}>
          <Text style={{textAlign:'center', fontSize:20, fontWeight:'bold'}}>General Details</Text>
          </View>
        <TextInput
          placeholder="Enter First Name"
          onChangeText={TextInputFName => this.setState({ TextInputFName })}
          underlineColorAndroid="transparent"
          style={styles.TextInput}
        />
        <TextInput
          placeholder="Enter Last Name"
          onChangeText={TextInputLName => this.setState({ TextInputLName })}
          underlineColorAndroid="transparent"
          style={styles.TextInput}
          
        />
        <Picker
          selectedValue={this.state.choosenLabel}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ choosenLabel: itemValue, choosenindex: itemIndex})
            
          }>
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Male" value="Male" />
        </Picker>
        <TextInput
          placeholder="Spouse Name"
          onChangeText={spouseName => this.setState({ spouseName })}
          underlineColorAndroid="transparent"
          style={styles.TextInput}
        />
         <TextInput
          placeholder="Father's Name"
          onChangeText={fatherName => this.setState({ fatherName })}
          underlineColorAndroid="transparent"
          style={styles.TextInput}
        />
         <TextInput
          placeholder="Father is Law"
          onChangeText={fatherInLaw => this.setState({ fatherInLaw })}
          underlineColorAndroid="transparent"
          style={styles.TextInput}
        />


         <TextInput
          placeholder="Family count"
          onChangeText={familyCount => this.setState({ familyCount })}
          keyboardType='number-pad'
          underlineColorAndroid="transparent"
          style={styles.TextInput}
        />
        <View style={{alignItems:'center',padding:15}}>
        <Image
            source={{ uri: this.state.filePath.uri }}
            style={{ width: 250, height: 250 }}
          />
          </View>
         <View style={{marginTop:15}}>
         <Button title="Member Photo" onPress={this.chooseFile.bind(this)} />
         </View>
          <Text>Province Name</Text>
         
          <Picker
            selectedValue={this.state.selected_province}

            onValueChange={(itemValue, itemIndex) => {
              this.setState({selected_province: itemValue});
              this.getDistricts(itemValue);
              }} >

            { this.state.provinces.map((item, key)=>(
            <Picker.Item label={item.ProvinceName} value={item.ProvinceID} key={key} />)
            )}
    
          </Picker>

         <Text>District Name</Text>
         
         <Picker
            selectedValue={this.state.selected_district}

            onValueChange={(itemValue, itemIndex) => {
              this.setState({selected_district: itemValue});
             }} >

            { this.state.districts.map((item, key)=>(
            <Picker.Item label={item.DistrictName} value={item.DistrictID} key={key} />)
            )}
    
          </Picker>

           {/* <Text>Vdc Name</Text> */}
         
         {/* <Picker
            selectedValue={this.state.selected_vdc}

            onValueChange={(itemValue, itemIndex) => this.setState({selected_vdc: itemValue})} >

            { this.state.vdcs.map((item, key)=>(
            <Picker.Item label={item.VdcName} value={item.VdcID} key={key} />)
            )}
    
          </Picker> */}
    
          <View style={{backgroundColor:'#9dc3c7', padding:10}}>
            <Text style={{textAlign:'center', fontSize:20, fontWeight:'bold'}}>
              Income Details
            </Text>
          </View>

       
         <TextInput
          placeholder="Pension from family Member"
          onChangeText={pension => this.setState({ pension })}
          underlineColorAndroid="transparent"
          keyboardType="decimal-pad"
          style={styles.TextInput}
        />
         <TextInput
          placeholder="Salary, Daily Wage, Allowance"
          onChangeText={salary => this.setState({ salary })}
          underlineColorAndroid="transparent"
          keyboardType="decimal-pad"
          style={styles.TextInput}
        />
         <TextInput
          placeholder="Remittance from abroad"
          onChangeText={remittance => this.setState({ remittance })}
          underlineColorAndroid="transparent"
          keyboardType="decimal-pad"
          style={styles.TextInput}
        />
         <TextInput
          placeholder="Agricultural product sales(paddy,maize,wheat,kodo)"
          onChangeText={agricultureCashCrops => this.setState({ agricultureCashCrops })}
          underlineColorAndroid="transparent"
          keyboardType="decimal-pad"
          style={styles.TextInput}
        />
        <TextInput
          placeholder="Agricultural product sales (Vegetable, fruit etc.)"
          onChangeText={agricultureFoodCrops => this.setState({ agricultureFoodCrops })}
          underlineColorAndroid="transparent"
          keyboardType="decimal-pad"
          style={styles.TextInput}
        />
        <TextInput
          placeholder="Animal sales (goat, pig, buffalo, cow etc.)"
          onChangeText={animalSales => this.setState({ animalSales })}
          underlineColorAndroid="transparent"
          keyboardType="decimal-pad"
          style={styles.TextInput}
        />
        <TextInput
          placeholder="Poultry sales"
          onChangeText={poultrySales => this.setState({ poultrySales })}
          underlineColorAndroid="transparent"
          keyboardType="decimal-pad"
          style={styles.TextInput}
        />
        <TextInput
          placeholder="Net income from business, if any"
          onChangeText={businessIncome => this.setState({ businessIncome })}
          underlineColorAndroid="transparent"
          keyboardType="decimal-pad"
          style={styles.TextInput}
        />
        <TextInput
          placeholder="Other Income"
          onChangeText={otherIncome => this.setState({ otherIncome })}
          underlineColorAndroid="transparent"
          keyboardType="decimal-pad"
          style={styles.TextInput}
        />
         <View style={{backgroundColor:'#9dc3c7', padding:10,marginTop:10}}>
            <Text style={{textAlign:'center', fontSize:20, fontWeight:'bold'}}>
              Expenses Details
            </Text>
          </View>
          <TextInput
          placeholder="Agriculture (Fertilizer, seed etc.)"
          onChangeText={agriferti => this.setState({ agriferti })}
          underlineColorAndroid="transparent"
          keyboardType="decimal-pad"
          style={styles.TextInput}
        />
        <TextInput
          placeholder="Agriculture (Ploughing, irrigation etc.)"
          onChangeText={agriTools => this.setState({ agriTools })}
          underlineColorAndroid="transparent"
          keyboardType="decimal-pad"
          style={styles.TextInput}
        />
        <TextInput
          placeholder="Agriculture (Labour, transport etc.)"
          onChangeText={agriOther => this.setState({ agriOther })}
          underlineColorAndroid="transparent"
          keyboardType="decimal-pad"
          style={styles.TextInput}
        />
        <TextInput
          placeholder="Animal husbandry (feed, grass, straw etc.)"
          onChangeText={animalHusbendry => this.setState({ animalHusbendry })}
          underlineColorAndroid="transparent"
          keyboardType="decimal-pad"
          style={styles.TextInput}
        />
        <TextInput
          placeholder="Expenses on food"
          onChangeText={foodExp => this.setState({ foodExp })}
          underlineColorAndroid="transparent"
          keyboardType="decimal-pad"
          style={styles.TextInput}
        />
        <TextInput
          placeholder="Electricity, water etc."
          onChangeText={utilityExp => this.setState({ utilityExp })}
          underlineColorAndroid="transparent"
          keyboardType="decimal-pad"
          style={styles.TextInput}
        />
        <TextInput
          placeholder="Phone/mobile recharge"
          onChangeText={phoneMob => this.setState({ phoneMob })}
          underlineColorAndroid="transparent"
          keyboardType="decimal-pad"
          style={styles.TextInput}
        />
        <TextInput
          placeholder="House rent"
          onChangeText={rentExp => this.setState({ rentExp })}
          underlineColorAndroid="transparent"
          keyboardType="decimal-pad"
          style={styles.TextInput}
        />
        <TextInput
          placeholder="Transport"
          onChangeText={transport => this.setState({ transport })}
          underlineColorAndroid="transparent"
          keyboardType="decimal-pad"
          style={styles.TextInput}
        />
        <TextInput
          placeholder="Clothing for family"
          onChangeText={clothing => this.setState({ clothing })}
          underlineColorAndroid="transparent"
          keyboardType="decimal-pad"
          style={styles.TextInput}
        />
        <TextInput
          placeholder="Medical expenses"
          onChangeText={medical => this.setState({ medical })}
          underlineColorAndroid="transparent"
          keyboardType="decimal-pad"
          style={styles.TextInput}
        />
        <TextInput
          placeholder="Education (fee, admission, book, pen, uniform etc.)"
          onChangeText={education => this.setState({ education })}
          underlineColorAndroid="transparent"
          keyboardType="decimal-pad"
          style={styles.TextInput}
        />
        <TextInput
          placeholder="Monthly loan installment repayment"
          onChangeText={loanInstallment => this.setState({ loanInstallment })}
          underlineColorAndroid="transparent"
          keyboardType="decimal-pad"
          style={styles.TextInput}
        />
        <TextInput
          placeholder="Other Expenses"
          onChangeText={OtherExp => this.setState({ OtherExp })}
          underlineColorAndroid="transparent"
          keyboardType="decimal-pad"
          style={styles.TextInput}
        />
         <TouchableOpacity
        style={{paddingTop:30}}
        
        >
          <Text style={{backgroundColor:'#829ae8', textAlign:'center',padding:10,marginBottom:100,fontSize:30}}
          onPress={()=>this.submit()}          
          >
            Submit
          </Text>
        </TouchableOpacity>
        </ScrollView>
        </View>
       
        
        </View>
      
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  TextInput: {
    width: '100%',
    height: 40,
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
    backgroundColor: 'rgba(25,20,20,1)',
  },
});