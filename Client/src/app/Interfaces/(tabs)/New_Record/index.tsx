import {View, Text, TextInput, ScrollView, SafeAreaView, Pressable, TouchableOpacity, Alert} from "react-native";
import { useUserContext } from "../../../Context/User/UserContext";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from "react";
import {Calendar} from "react-native-calendars";
import axios from 'axios';

const NewRecord = () => {
    const { value }:any = useUserContext();
    const [isSugar, setIsSugar] = useState(false);
    const [calendar, setCalendar] = useState(false);
    const date = new Date();
    const [userRecord, setUserRecord] = useState({name:value,user:{view:"",date:"",bp:"",pulse:"",sugar:""}})

    const handleUpload =()=>{
        if(userRecord.user.date.trim()==="" || userRecord.user.view.trim()==="" || userRecord.user.bp.trim()==="" || userRecord.user.pulse.trim()==="")
        {
            alert("Please fill all the fields");
        }
        // axios.post('http://192.168.1.10:3030/userRecord', userRecord)
        else{axios.post('https://server-healthcare.vercel.app/userRecord',userRecord)
        .then((res)=>{
            if(res.data === "Uploaded Record")
            {
                Alert.alert(
                    "Record Uploaded",
                    "Record has been uploaded successfully",
                    [{
                        text:"OK"
                    }]
                )
            }
            else if(res.data === "Already Entered")
            {
                Alert.alert(
                    "Record Already Entered",
                    "Record has already been entered for this date",
                    [{
                        text:"OK"
                    }]
                )
            }
            else
            {
                Alert.alert(
                    "Error",
                    "Error in uploading the record",
                    [{
                        text:"OK"
                    }]
                )
            }
        })
        .catch((err)=>{console.log(err)});
        setUserRecord({...userRecord,user:{...userRecord.user,view:"",date:"",bp:"",pulse:"",sugar:""}});}
    }

    return (
        <>
            <SafeAreaView className="mt-20">
                <ScrollView className="mx-5" showsVerticalScrollIndicator={false}>
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
                            <Text className="font-semibold text-slate-900 text-xl">Date</Text>
                            <View className="bg-slate-200 px-5 py-1 mt-3 mb-4 rounded-full flex items-center justify-start flex-row">
                                <AntDesign name="calendar" size={24} color="blue" />
                                <Text className="my-2 text-lg w-[85%] ml-3 text-slate-600" onPress={()=>{setCalendar(true)}}>
                                    {userRecord.user.date?userRecord.user.date:"Select Date"}
                                </Text>
                            </View>
                            {
                                calendar &&
                                <Calendar
                                    maxDate={new Date().toDateString()}
                                    onDayPress={(day: any)=>{
                                        setUserRecord((prevState)=>({...prevState,user:{...prevState.user,date:day.dateString,view:day.day+"/"+day.month}}));
                                        setCalendar(false);
                                    }}
                                    className="w-[80vw] py-3 px-5 mb-5 shadow-md rounded-xl shadow-slate-800"
                                />
                            }
                        </View>
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
