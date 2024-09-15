import { View, Text, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const LoadingScreen = () => {
    return (
        <>
            <StatusBar 
                barStyle="light-content"
                backgroundColor="#000"
            />
            <SafeAreaView className="flex-1 bg-slate-900">
                <View className="w-screen h-full flex items-center justify-center">
                    <LottieView 
                        source={{uri:"https://lottie.host/ec975ba1-6fc3-44f1-acac-91938720a2d5/PF93s0yFj0.json"}}
                        autoPlay
                        loop
                        speed={3}
                        style={{height:150,width:150}}
                    />
                </View>
            </SafeAreaView>
        </>
    );
};

export default LoadingScreen;
