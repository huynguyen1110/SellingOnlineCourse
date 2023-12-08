import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Path, Svg } from 'react-native-svg';
import YouTubeIframe from 'react-native-youtube-iframe';

const YouTubePlayer = (props: any) => {
  return (
    <View style={{ flex: 1 }}>
      <YouTubeIframe
        videoId={props.videoId}
        height={230}
      />
      <ScrollView style={{marginHorizontal: 15}}>
        <View>
          <Text style={{fontWeight:'700', fontSize: 17}}>Mô tả:</Text>  
          <Text>{props.moTa}</Text>
        </View>        
        <Text style={{fontWeight:'700', fontSize: 17}}>Nội dung:</Text>       
        <View>
          {props.noiDung?.split('. ').map((item: any, index: any) => (
            <View key={index} style={{display: 'flex', flexDirection: 'row', marginTop: 4}}>
              <Svg fill={'green'} style={{ width: 18, height: 18 }} viewBox="0 0 448 512">
                <Path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
              </Svg>
              <Text style={{marginLeft: 9}}>{item}</Text>
            </View>
          ))}
        </View>  
        <Text style={{fontWeight:'700', fontSize: 17}}>Đánh giá:</Text>
      </ScrollView>
    </View>
  );
};

export default YouTubePlayer;
