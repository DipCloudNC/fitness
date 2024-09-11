import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function exercisesDetails() {
  const item = useLocalSearchParams();
  const router = useRouter();
  console.log(item);
  return (
    <View className="flex flex-1">
      <StatusBar style="dark" />
      <View className="shadow-md bg-neutral-200 rounded-b[40px]">
        <Image
          source={{ uri: item.gifUrl }}
          contentFit="cover"
          style={{ width: wp(100), height: wp(100) }}
          className="rounded-b-[40px]"
        />
      </View>
      <TouchableOpacity
        onPress={() => router.back()}
        className="bg-purple-500 mx-4 absolute rounded-full flex justify-center items-center pr-1"
        style={{ width: hp(5.5), height: hp(5.5), marginTop: hp(5) }}
      >
        <Ionicons name="caret-back-outline" size={hp(4)} color="white" />
      </TouchableOpacity>

      {/* details */}

      <ScrollView
        className="mx-2 space-y-3 pt-3"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <Animated.Text
          entering={FadeInDown.duration(300).springify()}
          style={{ fontSize: hp(3.5) }}
          className="font-semibold text-neutral-700 tracking-wide"
        >
          {item.name}
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(100).duration(300).springify()}
          style={{ fontSize: hp(2) }}
          className=" text-neutral-700 tracking-wide"
        >
          Equipment{" "}
          <Text className="font-bold text-neutral-800">{item?.equipment}</Text>
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(200).duration(300).springify()}
          style={{ fontSize: hp(2) }}
          className=" text-neutral-700 tracking-wide"
        >
          Secondry Muscles{" "}
          <Text className="font-bold text-neutral-800">
            {item?.secondaryMuscles}
          </Text>
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(300).duration(300).springify()}
          style={{ fontSize: hp(2) }}
          className=" text-neutral-700 tracking-wide"
        >
          Target Muscles{" "}
          <Text className="font-bold text-neutral-800">{item?.target}</Text>
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(400).duration(300).springify()}
          style={{ fontSize: hp(3) }}
          className="font-semibold text-neutral-700 tracking-wide"
        >
          Instructions
        </Animated.Text>
        {item.instructions.split(",").map((instructions, index) => {
          return (
            <Animated.Text
              entering={FadeInDown.delay(500).duration(300).springify()}
              key={index}
              style={{ fontSize: hp(1.7) }}
              className=" text-neutral-800 tracking-wide"
            >
              {instructions}
            </Animated.Text>
          );
        })}
      </ScrollView>
    </View>
  );
}
