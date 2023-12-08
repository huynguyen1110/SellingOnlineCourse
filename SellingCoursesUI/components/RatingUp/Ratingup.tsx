import { Button } from '@rneui/base';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity ,Image,StyleSheet, TextInput,Alert} from 'react-native';
import Svg, { Path ,Polygon} from 'react-native-svg';



const Ratingup = () => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0); // Khởi tạo rating ban đầu là 0

  const handleStarPress = (selectedRating: number) => {
    if (selectedRating === rating) {
      // Nếu người dùng chọn cùng một sao hai lần liên tiếp, hủy đánh giá
      setRating(0);
    } else {
      setRating(selectedRating);
      // Thực hiện các xử lý khác dựa trên đánh giá sao ở đây
    }
  };
  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert("Thông báo", "Bạn chưa đánh giá.");
    } else {
    
      Alert.alert("Thông báo", "Gửi thành công. Cảm ơn bạn đã góp ý !");
    }
  };
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleStarPress(i)}
          style={{ marginRight: 10 }}
        >
          <Svg width="40" height="35" viewBox="0 0 576 512" >
          <Polygon
              points="288 0 354.7 141.3 508.1 163.9 383.1 253.7 419.4 405.5 288 348 156.6 405.5 192.9 253.7 67.9 163.9 221.3 141.3"
              fill={i <= rating ? '#f2ec29' : 'transparent'}          
              stroke="#bab513"
              strokeWidth={10}
            />
          </Svg>
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <View>
      <Text style={{fontSize:17,fontWeight:"bold",paddingTop:10}}>Đánh giá của học viên:</Text>
      <View style = {styless.rate}>
        <Image style={styless.inputimage} source={require('../../assets/images/logos/vecteezy_education-vector-logo-open-book-dictionary-textbook-or_4263549.jpg')} />
         <Text style={{fontWeight:'bold'}} >Bạn đánh giá khóa học này như thế nào ? </Text>
         <View style={{ flexDirection: 'row',marginVertical : 20 ,marginHorizontal : 10}}>
                {renderStars()}
          </View>
         <Text style={{paddingBottom:15}}>Bạn đã chọn {rating > 0 ? rating + ' sao' : 'không đánh giá sao'}</Text>      
      </View>  
      
        <TouchableOpacity style={styless.commen}>
            <TextInput placeholder="Chia sẻ cảm nhận của bạn" onChangeText={(text) => setComment(text)}
          multiline={true}/>
        </TouchableOpacity> 
        <TouchableOpacity style={styless.button} onPress={handleSubmit}>
            <Text style={styless.buttonText}>Gửi</Text>
        </TouchableOpacity>
    </View>
  );
}
const styless = StyleSheet.create ( {
    inputimage : {
        width : 70,
        height : 70,
        marginHorizontal:'40%',
        marginVertical : 10,
        borderColor : 'black',
        borderWidth : 1,
        borderRadius : 35,
    },
    rate : {   
        alignItems : 'center',
        paddingTop : 10,
    },
    commen : {
        width : "92%",
        marginHorizontal:'4%',
        height : 80,
        borderColor : '#bab99e',
        borderWidth : 1,
        borderRadius : 6,
        paddingLeft : 5,
        paddingTop : 3
    },
    button: {
        backgroundColor: '#007bff',
        width : "92%",
        marginHorizontal:'4%',
        height : 50, 
        padding: 10,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent : 'center',
        marginTop: 10, 
      },
      buttonText: {
        color: 'white', 
        fontWeight: 'bold',
        fontSize : 20
      },

})

export default Ratingup;
