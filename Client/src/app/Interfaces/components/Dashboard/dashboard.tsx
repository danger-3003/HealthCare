import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useEffect } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import axios from 'axios';
import { useState } from "react";
import LoadingScreen from "../Loading";

const Dashboard = (props:any) => {
    const [data,setData]=useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        axios.get("https://server-healthcare.vercel.app/userRecord/data/"+props.user)
        //axios.get("http://192.168.1.10:3030/userRecord/data/"+userID)
        .then((res)=>{
            setData(res.data.reverse());
            setLoading(false)
        })
        .catch(()=>{alert("Error in Getting User Record")});
    })

    const renderItem =({item}:any)=>{
        let BP=[];
        BP = item.bp.split("/");
        return(
            <>
                <View className="flex flex-row bg-[#cbe5eb] py-3 rounded-xl my-2 shadow-sm shadow-slate-900 mx-3">
                    <Text className="text-[#142850] text-lg w-28 text-center ml-5">{item.date}</Text>
                    <Text className={`${BP[0]>140 ||BP[1]>90?"text-red-600":`${BP[0]<100 || BP[1]<70?"text-blue-600":"text-[#142850]"}`} text-lg w-36 text-center`}>
                        {item.bp}
                    </Text>
                    <Text className={`${item.sugar>170?"text-red-600":"text-[#142850]"} text-lg w-40 text-center`}>
                        {item.sugar?item.sugar+"mg/dL":"- -"}
                    </Text>
                    <Text className={`${item.pulse>100||item.pulse<60?"text-red-600":"text-[#142850]"} text-lg w-20 text-center`}>
                        {item.pulse} BPM
                    </Text>
                </View>
            </>
        )
    }
    return (
        <>
            {
                loading?
                <LoadingScreen />
                :<>
                    {
                        data.length > 0 ? (
                            <>
                                <View className="flex flex-row justify-end w-full">
                                    <View className="flex flex-row items-center"><View className="bg-blue-600 h-3 w-3"></View><Text className="text-blue-600">{" "}Low BP</Text></View>
                                    <View className="flex flex-row items-center mx-2"><View className="bg-red-600 h-3 w-3"></View><Text className="text-red-600">{" "}Alert</Text></View>
                                </View>
                                <ScrollView
                                    horizontal={true}
                                    showsVerticalScrollIndicator={true}
                                    className="w-full h-max"
                                >
                                    <View className="flex items-center justify-around flex-col w-full">
                                        <View className="px-3">
                                            <View className="flex justify-around items-center flex-row bg-[#142850] w-full py-3 px-6 rounded-xl my-2 shadow-lg shadow-slate-900">
                                                <Text className="text-white font-extrabold text-xl w-28 text-center">
                                                    Date
                                                </Text>
                                                <Text className="text-white font-extrabold text-xl w-36 text-center">
                                                    Blood Pressure
                                                </Text>
                                                <Text className="text-white font-extrabold text-xl w-40 text-center">
                                                    Blood Sugar
                                                </Text>
                                                <Text className="text-white font-extrabold text-xl w-20 text-center">
                                                    Pulse
                                                </Text>
                                            </View>
                                        </View>
                                        <FlatList
                                            className="w-full"
                                            data={data.slice(0, 4)}
                                            renderItem={renderItem}
                                            keyExtractor={(item: any, index) => index.toString()}
                                        />
                                    </View>
                                </ScrollView>
                            </>
                        ) : (
                            <View className="w-full">
                                <Text className="text-red-600 text-xl font-bold text-center">
                                    No Record Found{" "}
                                    <Entypo name="emoji-sad" size={24} color="#dc2626" />
                                </Text>
                            </View>
                        )
                    }
                </>
            }
        </>
    );
};

export default Dashboard;
