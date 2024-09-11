import React, { useEffect, useRef } from "react";
import { FlatList, Image, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeIn } from "react-native-reanimated";

const sliderBannerImages = [
  require("../assets/images/slide6.jpg"),
  require("../assets/images/slide1.jpg"),
  require("../assets/images/slide2.jpg"),
  require("../assets/images/slide3.jpg"),
  require("../assets/images/slide4.jpg"),
  require("../assets/images/slide5.jpg"),
];

export default function Banner() {
  const flatListRef = useRef(null);
  const scrollInterval = useRef(null);

  useEffect(() => {
    let currentIndex = 0;

    scrollInterval.current = setInterval(() => {
      currentIndex += 1;
      if (currentIndex >= sliderBannerImages.length) {
        currentIndex = 0;
      }
      flatListRef.current?.scrollToIndex({
        index: currentIndex,
        animated: true,
      });
    }, 3000);

    return () => {
      clearInterval(scrollInterval.current);
    };
  }, []);

  return (
    <Animated.View entering={FadeIn}>
      <FlatList
        ref={flatListRef}
        data={sliderBannerImages}
        horizontal
        renderItem={({ item }) => (
          <Image
            source={item}
            style={{
              width: wp("90%"),
              height: hp("25%"),
              marginHorizontal: wp("2.5%"),
              borderRadius: 10,
            }}
            resizeMode="cover"
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </Animated.View>
  );
}
