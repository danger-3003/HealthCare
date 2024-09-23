import { Text, View, StatusBar, SafeAreaView, ScrollView } from "react-native";
import LottieView from "lottie-react-native";
import Services from "../components/Services/services";
import About from "../components/About/about";
import Dashboard from "../components/Dashboard/Dashboard";
import { useLocalSearchParams } from "expo-router";
import { useUserContext } from "../../Context/User/UserContext";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingScreen from "../components/Loading";
import Entypo from "@expo/vector-icons/Entypo";

function HomeContext() {
    const {userID} = useLocalSearchParams();
    const {value, setValue}:any = useUserContext();
    const [data,setData]:any = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        axios.get("https://server-healthcare.vercel.app/userRecord/data/"+userID)
        .then((res)=>{setData(res.data);setLoading(false)})
        .catch(()=>{alert("Error in Getting User Record")});
    });
    useEffect(()=>{
        setValue(userID);
    },[userID]);
    return (
        <>
        {   !loading?
            <SafeAreaView className="">
                <StatusBar barStyle={"light-content"} backgroundColor={"#000"} />
                <ScrollView showsVerticalScrollIndicator={false}>
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
                            {
                                data.length>0?
                                <Services data={data}/>
                                :<View className="w-full"><Text className="text-red-600 text-xl font-bold text-center">No Record Found <Entypo name="emoji-sad" size={24} color="#dc2626" /></Text></View>
                            }
                        </View>
                    </View>
                    <View className="w-full">
                        <About />
                    </View>
                    <View className=" mx-5">
                        <Text className="text-2xl font-bold">Your Dashboard</Text>
                        <View className="flex items-center justify-center">
                            <Dashboard data={data}/>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
            :<LoadingScreen />
        }
        </>
    );
}

function Home(){
    return(
        <HomeContext />
    )
}

export default Home;