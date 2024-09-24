import { Text, View, StatusBar, SafeAreaView, ScrollView, FlatList } from "react-native";
import LottieView from "lottie-react-native";
import Services from "../components/Services/services";
import About from "../components/About/about";
import { useLocalSearchParams } from "expo-router";
import { useUserContext } from "../../Context/User/UserContext";
import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard/Dashboard";

function HomeContext() {
    const {userID} = useLocalSearchParams();
    const {value, setValue}:any = useUserContext();
    useEffect(()=>{
        setValue(userID);
    },[userID]);
    
    return (
        <>
            <SafeAreaView className="">
                <StatusBar barStyle={"light-content"} backgroundColor={"#000"} />
                <ScrollView showsVerticalScrollIndicator={false} className="mb-5">
                    <View className="flex items-center justify-between flex-row bg-slate-200 rounded-3xl h-40 mx-5 mt-20 p-5 shadow-xl shadow-slate-900">
                        <View className="flex items-start justify-center w-[65%] ">
                            <View className="flex items-center justify-center flex-row">
                                <LottieView
                                    source={{
                                        uri: "https://lottie.host/de3d759a-e65d-488c-9dcd-b27116ae5d74/Ceu5vvZjtZ.json",
                                    }}
                                    loop
                                    autoPlay
                                    style={{ width: 30, height: 30 }}
                                />
                                <Text className="text-xl font-medium" style={{fontWeight:500}}>
                                    Hello !
                                </Text>
                            </View>
                            <Text className="text-2xl font-extrabold w-full" numberOfLines={2}>
                                {value}
                            </Text>
                        </View>
                        <View className="w-[35vw] h-[35vw]">
                            <LottieView
                                source={{
                                    uri: "https://lottie.host/bc01e504-ca97-4bed-98e5-ce35ed3b2032/nHFi4Zb4wt.json",
                                }}
                                loop
                                autoPlay
                                style={{ width: "100%", height: "90%", position:"absolute"}}
                            />
                        </View>
                    </View>
                    <View className="my-5 mx-5">
                        <Text className="text-2xl font-bold">Services</Text>
                        <View className="flex items-center justify-center flex-row my-3">
                            <Services user={userID}/>
                        </View>
                    </View>
                    <View className="w-full">
                        <About />
                    </View>
                    <View className=" mx-5 mt-5 mb-20">
                        <Text className="text-2xl font-bold mb-2">Your Dashboard</Text>
                        <Text className="text-lg">Your latest records.</Text>
                        <View className="flex flex-row justify-end">
                            <View className="flex flex-row items-center"><View className="bg-blue-600 h-3 w-3"></View><Text className="text-blue-600">{" "}Low BP</Text></View>
                            <View className="flex flex-row items-center mx-2"><View className="bg-red-600 h-3 w-3"></View><Text className="text-red-600">{" "}Alert</Text></View>
                        </View>
                        <View className="flex items-center justify-center">
                            <Dashboard user={userID}/>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

function Home(){
    return(
        <HomeContext />
    )
}

export default Home;