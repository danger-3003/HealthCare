import { View, Text } from "react-native";
import React from "react";

const AboutCard = (props) => {
    return (
        <View className={`bg-blue-100 h-56 w-[90vw] mx-[5vw] mb-[5vw] rounded-3xl shadow-lg shadow-slate-500 overflow-hidden relative block`} style={{backgroundColor:props.layer1}} >
            <View className={`bg-violet-300 h-52 w-[65%] rounded-full absolute -left-28 top-2 z-[2]`} style={{backgroundColor:props.layer2}} ></View>
            <View className={`bg-violet-200 h-52 w-[55%] rounded-full absolute -left-28 top-2 z-[3]`} style={{backgroundColor:props.layer3}} ></View>
        </View>
    );
};

export default AboutCard;