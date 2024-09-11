import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { fetchExercisesByBodyPart } from "../api/exercisesDB";
import { ScrollView } from "react-native-virtualized-view";
import { StatusBar } from "expo-status-bar";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ExercisesList from "../components/ExercisesList";

export default function Exercises() {
  const router = useRouter();
  const item = useLocalSearchParams();
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    if (item && item.name) {
      const bodyPart = item.name.toLowerCase();
      if (
        ["chest", "back", "legs", "arms", "shoulders", "abs"].includes(bodyPart)
      ) {
        getExercises(bodyPart);
      } else {
        console.error(
          `Invalid body part: ${item.name}. Allowed values are: chest, back, legs, arms, shoulders, abs`
        );
      }
    }
  }, []);

  const getExercises = async (bodyPart) => {
    if (!bodyPart) {
      console.error("Body part is required");
      return;
    }
    console.log("Fetching exercises for body part:", bodyPart);
    let data = await fetchExercisesByBodyPart(bodyPart);
    setExercises(data || []);
  };

  return (
    <ScrollView>
      <StatusBar style="light" />
      <Image
        source={item.image}
        style={{ width: wp(100), height: hp(45) }}
        className="rounded-b-[40px]"
      />
      <TouchableOpacity
        onPress={() => router.back()}
        className="bg-purple-500 mx-4 absolute rounded-full flex justify-center items-center pr-1"
        style={{ width: hp(5.5), height: hp(5.5), marginTop: hp(5) }}
      >
        <Ionicons name="caret-back-outline" size={hp(4)} color="white" />
      </TouchableOpacity>

      {/* exercises */}
      <View className="mx-4 space-y-3 mt-3">
        <Text
          style={{ fontSize: hp(3) }}
          className="font-semibold text-neutral-700"
        >
          {item.name} exercises
        </Text>
        <View className="mb-10">
          <ExercisesList data={exercises} />
        </View>
      </View>
    </ScrollView>
  );
}
