import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Video } from 'expo-av';
import { Svg, Path } from 'react-native-svg';

export default function VideoComponent(props: any) {
  return (
    <View style={{flex: 0}}>
      <Video
        source={{ uri: props.src }}
        useNativeControls
        style={{
          width: '100%',
          height: 240,
        }}
        isLooping
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  webView: {
    height: 300
  },
});
