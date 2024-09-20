import {View, Text, TextInput, ScrollView, SafeAreaView, Pressable, TouchableOpacity} from "react-native";
import { useUserContext } from "../../../Context/User/UserContext";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
import { useState } from "react";
import axios from 'axios';

const NewRecord = () => {
    const { value }:any = useUserContext();
    const [isSugar, setIsSugar] = useState(false);
    const date = new Date();
    const [userRecord, setUserRecord] = useState({name:value,user:{date:date.toDateString(),bp:"",pulse:"",sugar:""}})

    const handleUpload =()=>{
        console.log(userRecord);
        axios.post('http://192.168.1.10:3030/userRecord',userRecord)
        .then((res)=>{console.log(res);setUserRecord({...userRecord,user:{...userRecord.user,bp:"",pulse:"",sugar:""}})})
        .catch((err)=>{console.log(err)});
    }

    return (
        <>
            <SafeAreaView className="mt-20">
                <ScrollView className="mx-5">
                    <View className="flex items-center justify-between flex-row mb-5">
                        <View>
                            <Text className="text-3xl font-extrabold uppercase mt-16">New Record</Text>
                            <Text className="text-lg font-medium text-slate-500">{date.toDateString()}</Text>
                        </View>
                        <MaterialCommunityIcons name="file-document-edit-outline" size={100} color="#1e293b"/>
                    </View>
                    <View className="bg-slate-900 w-full rounded-full" style={{height:2.5}}></View>
                    <View className="flex items-center justify-center w-full my-6">
                        <View className="w-[90%]">
                            <Text className="font-semibold text-slate-900 text-xl">Blood Pressure</Text>
                            <View className="bg-slate-200 px-5 py-1 my-3 rounded-full flex items-center justify-start flex-row">
                                <FontAwesome5 name="heartbeat" size={24} color="red" />
                                <TextInput
                                    className="my-2 text-lg w-[85%] ml-3"
                                    placeholder="Enter Blood Pressure (120/80)"
                                    value={userRecord.user.bp}
                                    onChangeText={(text)=>{setUserRecord({...userRecord,user:{...userRecord.user,bp:text}})}}
                                />
                            </View>
                        </View>
                        <View className="w-[90%] mt-2">
                            <Text className="font-semibold text-slate-900 text-xl">Heart Beat <Text className="text-lg text-slate-400">(Pulse)</Text></Text>
                            <View className="bg-slate-200 px-5 py-1 my-3 rounded-full flex items-center justify-start flex-row">
                            <Fontisto name="heartbeat-alt" size={24} color="red" />
                                <TextInput
                                    className="my-2 text-lg w-[85%] ml-3"
                                    placeholder="Enter Pulse rate (75 BPM)"
                                    keyboardType="decimal-pad"
                                    value={userRecord.user.pulse}
                                    onChangeText={(text)=>{setUserRecord({...userRecord,user:{...userRecord.user,pulse:text}})}}
                                />
                            </View>
                        </View>
                        {
                            isSugar && 
                            <View className="w-[90%] mt-2">
                                <Text className="font-semibold text-slate-900 text-xl">Blood Sugar <Text className="text-lg text-slate-400">(Glucose)</Text></Text>
                                <View className="bg-slate-200 px-5 py-1 my-3 rounded-full flex items-center justify-start flex-row">
                                    <MaterialCommunityIcons name="diabetes" size={25} color="red" />
                                    <TextInput
                                        className="my-2 text-lg w-[85%] ml-3"
                                        placeholder="Enter Blood Sugar (mg/dl)"
                                        keyboardType="decimal-pad"
                                        value={userRecord.user.sugar}
                                        onChangeText={(text)=>{setUserRecord({...userRecord,user:{...userRecord.user,sugar:text}})}}
                                    />
                                </View>
                            </View>
                        }
                        {
                            isSugar?
                            <Pressable onPress={()=>{setIsSugar(false)}}>
                                <View><Text className="text-md font-semibold text-red-400">Remove Blood Sugar field</Text></View>
                            </Pressable>
                            :
                            <Pressable onPress={()=>{setIsSugar(true)}}>
                                <View><Text className="text-md font-semibold">Add Blood Sugar field</Text></View>
                            </Pressable>
                        }
                        
                        <TouchableOpacity className="bg-green-400 px-10 py-2 my-10 w-[70%] shadow-md shadow-green-800"
                            onPress={handleUpload}
                            style={{
                                borderTopEndRadius:40,
                                borderBottomStartRadius:40,
                                borderBottomEndRadius:10,
                                borderTopLeftRadius:10
                            }}
                            >
                            <View className="flex items-center justify-center">
                                <Text className="text-xl text-green-800 font-extrabold">Upload{"  "}<Feather name="upload" style={{fontWeight:800}} size={24} color="#166534" /></Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const App = () => {
    return (
        <NewRecord />
    );
};

export default App;
