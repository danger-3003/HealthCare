import { Text, View, StatusBar, SafeAreaView, ScrollView } from "react-native";
import LottieView from "lottie-react-native";
import Services from "../components/Services/services";
import About from "../components/About/about";
import Dashboard from "../components/Dashboard/dashboard";
import { useLocalSearchParams } from "expo-router";
import { useUserContext } from "../../Context/User/UserContext";
import { useEffect } from "react";

function HomeContext() {
    const {userID} = useLocalSearchParams();
    const {value, setValue} = useUserContext();
    useEffect(()=>{
        setValue(userID);
    },[userID]);
    console.log(value);
    return (
        <SafeAreaView className="">
            <StatusBar barStyle={"light-content"} backgroundColor={"#000"} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="flex items-center justify-between flex-row bg-slate-200 rounded-3xl p-1 sm:p-2 mt-20 sm:mt-10 mx-5 ms:mx-10 shadow-xl shadow-slate-900">
                    <View className="flex items-start justify-center">
                        <View className="flex items-center justify-center flex-row mt-5">
                            <LottieView
                                source={{
                                    uri: "https://lottie.host/de3d759a-e65d-488c-9dcd-b27116ae5d74/Ceu5vvZjtZ.json",
                                }}
                                loop
                                autoPlay
                                style={{ width: 30, height: 30 }}
                            />
                            <Text className="text-2xl font-medium">
                                Hello !
                            </Text>
                        </View>
                        <Text className="text-3xl sm:text-3xl font-extrabold ml-2">
                            {value}
                        </Text>
                    </View>
                    <View className="w-32 h-36">
                        <LottieView
                            source={{
                                uri: "https://lottie.host/bc01e504-ca97-4bed-98e5-ce35ed3b2032/nHFi4Zb4wt.json",
                            }}
                            loop
                            autoPlay
                            style={{ width: "100%", height: "100%" }}
                        />
                    </View>
                </View>
                <View className="my-5 mx-5">
                    <Text className="text-2xl font-bold">Services</Text>
                    <View className="flex items-center justify-center flex-row my-3">
                        <Services bgcolor="bg-red-200 shadow-md shadow-slate-500" />
                        <Services bgcolor="bg-blue-200 shadow-md shadow-slate-500" />
                        <Services bgcolor="bg-green-200 shadow-md shadow-slate-500" />
                        <Services bgcolor="bg-violet-200 shadow-md shadow-slate-500" />
                    </View>
                </View>
                <View className="w-full">
                    <About />
                </View>
                <View className=" mx-5">
                    <Text className="text-2xl font-bold">Your Dashboard</Text>
                    <View>
                        <Dashboard />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

function Home(){
    return(
        <HomeContext />
    )
}

export default Home;