import {
  Animated,
  FlatList,
  Image,
  Text,
  View,
  Dimensions
} from "react-native"
import {
  useRef,
  useState,
  useEffect
} from 'react'
import { CarouselBannerStyle } from "./CarouselBannerStyle";
import { styles } from "../../styles/commonStyle";

const ImageBannerCarousel = () => {

  const { width, height } = Dimensions.get('window');

  const [images, setImages] = useState<any>([])

  const itemWidth = 308

  const SPACER_ITEM_SIZE = (width - itemWidth) / 2

  const scrollX = useRef(new Animated.Value(0)).current

  const snapInterval = itemWidth + 10;

  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollViewRef = useRef(null);

  useEffect(() => {
    const initialData = [
      {
        name: require('../../assets/images/banner_images/banner1.jpeg'),
      },
      {
        name: require('../../assets/images/banner_images/banner2.jpeg'),
      },
      {
        name: require('../../assets/images/banner_images/banner3.jpg'),
      },
      {
        name: require('../../assets/images/banner_images/banner4.png'),
      },
      {
        name: require('../../assets/images/banner_images/banner4.png'),
      },
    ];

    setImages([{ key: 'left-spacer' }, ...initialData, { key: 'righ-spacer' }]);
  }, []);

  useEffect(() => {
    let scrollInterval: any
  
    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        const nextIndex = currentIndex + 1 < images.length ? currentIndex + 1 : 0;
        scrollViewRef.current?.scrollToIndex({ index: nextIndex, animated: true, viewPosition: 0.5 });
        setCurrentIndex(nextIndex);
      }, 3000);
    };
  
    startAutoScroll();
  
    return () => {
      clearInterval(scrollInterval);
    };
  }, [currentIndex, []]);

  const renderImages = (item, index) => {

    const inputRange = [
      (index - 2) * itemWidth,
      (index - 1) * itemWidth,
      index * itemWidth,
    ];

    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [60, 50, 60],
      extrapolate: 'clamp',
    });

    if (item.key) {
      return <View style={{ width: 30 }} />;
    }

    if (item.name) {
      return (
        <Animated.View
          style={{
            marginHorizontal: 4,
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            transform: [{ translateY }],
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 4,
            elevation: 5
          }}>
          <Image source={item.name} style={CarouselBannerStyle.image_style} />
        </Animated.View>
      );
    }
    return (
      <View>
      </View>
    );
  };

  return (
    <View>
      <Animated.FlatList
        ref={scrollViewRef}
        data={images}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{
          alignItems: 'center',
        }}
        bounces={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => renderImages(item, index)}
        snapToInterval={snapInterval}
        snapToAlignment={'center'}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        style={CarouselBannerStyle.flat_list_container}
      />

    </View>
  )
}

export default ImageBannerCarousel

