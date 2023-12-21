import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Video } from 'expo-av';
import { Svg, Path } from 'react-native-svg';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function VideoComponent(props: any) {

  function getYoutubeVideoId(url: string) {
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i;
    const match = url && url.match(regExp);
  
    return match ? match[1] : null;
  }

  const videoId: any = getYoutubeVideoId(props.src);

  return (
    // <View style={{flex: 0}}>
    //   <Video
    //     source={{ uri: props.src }}
    //     useNativeControls
    //     style={{
    //       width: '100%',
    //       height: 240,
    //     }}
    //     isLooping
    //   />
    // </View>

    <View style={{flex: 0}}>
      <YoutubePlayer
        height={240}
        play={true}
        videoId={videoId}
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
