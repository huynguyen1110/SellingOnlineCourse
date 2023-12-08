import React, { useState } from 'react';
import { View, Text, TextInput, ActivityIndicator, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native"
import { styles } from '../styles/commonStyle';
import HeaderChangePassword from '../components/header/HeaderChangePassword';
import { changePassword } from '../services/authentication/loginRegesterServices';

const ChangePasswordScreen = () => {
  const [password, setPassword] = useState<any>();
  const [newPassword, setNewPassword] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation<any>()

  const handleChangePassword = async () => {
    try {
      setIsLoading(true)
      const response = await changePassword(password, newPassword);
      if (response.data.statusCode == "Success") {
        setIsLoading(false)
        alert(response.data.message)
        navigation.navigate("AccountScreen")
      }
      setIsLoading(false)

    } catch (error: any) {
      setIsLoading(false)
      alert(error.message)
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (<View style={styles.loading}><ActivityIndicator size="large" /></View>) : (<View></View>)}
      <HeaderChangePassword />
      <View style={stylecss.container}>
        <TextInput
          style={stylecss.input}
          placeholder="Mật khẩu hiện tại"
          onChangeText={setPassword}
        />
        <TextInput
          style={stylecss.input}
          placeholder="Mật khẩu mới"
          onChangeText={setNewPassword}
        />
      <TouchableOpacity onPress={handleChangePassword} style={stylecss.button}>
        <Text style={{fontSize: 16,fontWeight:'bold',color:'white'}}>Thay đổi</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  )
};
const stylecss = StyleSheet.create({
    container: {
      display: "flex",
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20
    },
    input: {
      borderWidth: 1,
      borderRadius: 5, 
      width: '80%',
      borderColor: 'black', 
      padding: 8, 
      marginLeft: 10, 
      marginTop: 15
    },
    button :{
        marginTop : 20,
        width : 100,
        height : 40,
        borderRadius : 5,
        backgroundColor:'red',
        justifyContent:"center",
        alignItems:'center'
    }
});    

export default ChangePasswordScreen