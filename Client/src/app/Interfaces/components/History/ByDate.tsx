import { ScrollView, Text, View } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import React from "react";

const ByDate = (props: any) => {
    const data=props.data;
    const FIND = data.find((FIND:any)=>FIND.date === props.date);
    let BP=[];
    FIND?BP = FIND.bp.split("/"):BP=[];

    return (
        <View>
            {
                FIND?
                <ScrollView horizontal={true} showsVerticalScrollIndicator={true} className="w-full h-max">
                    <View className="flex FINDs-center justify-around flex-col w-full">
                        <View className="">
                            <View className="flex justify-around FINDs-center flex-row bg-[#142850] w-full py-3 px-6 rounded-xl my-2 shadow-sm shadow-slate-900">
                                <Text className="text-white font-extrabold text-xl w-28 text-center">Date</Text>
                                <Text className="text-white font-extrabold text-xl w-36 text-center">Blood Pressure</Text>
                                <Text className="text-white font-extrabold text-xl w-40 text-center">Blood Sugar</Text>
                                <Text className="text-white font-extrabold text-xl w-20 text-center">Pulse</Text>
                            </View>
                        </View>
                        <View className="">
                            <View className="flex flex-row bg-slate-300 py-3 px-6 rounded-xl my-2 shadow-sm shadow-slate-900">
                            <Text className="text-[#142850] text-lg w-28 text-center ml-5">{FIND.date}</Text>
                                <Text className={`${BP[0]>140 ||BP[1]>90?"text-red-600":`${BP[0]<100 || BP[1]<70?"text-blue-600":"text-[#142850]"}`} text-lg w-36 text-center`}>
                                    {FIND.bp}
                                </Text>
                                <Text className={`${FIND.sugar>170?"text-red-600":"text-[#142850]"} text-lg w-40 text-center`}>
                                    {FIND.sugar?FIND.sugar+"mg/dL":"- -"}
                                </Text>
                                <Text className={`${FIND.pulse>100||FIND.pulse<60?"text-red-600":"text-[#142850]"} text-lg w-20 text-center`}>
                                    {FIND.pulse} BPM
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                :<View className="w-full"><Text className="text-red-600 text-xl font-bold text-center">No Record Found <Entypo name="emoji-sad" size={24} color="#dc2626" /></Text></View>
            }
        </View>
    );
};

export default ByDate;
