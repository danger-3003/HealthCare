import { ScrollView, Text, View, FlatList, Alert } from "react-native";
import { useUserContext } from "@/src/app/Context/User/UserContext";
import {useEffect, useState} from "react";
import LoadingScreen from "../../components/Loading";
import axios from "axios";
import AntDesign from "@expo/vector-icons/AntDesign";
import ByDate from "../../components/History/ByDate";
import { Calendar } from "react-native-calendars";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const History = () => {
    const {value}:any=useUserContext();
    const [data, setData]:any = useState();
    const [loading, setLoading]:any = useState(true);
    const [calendar, setCalendar]:any=useState(false);
    const [date, setDate]:any = useState("");
    useEffect(()=>{
        axios.get('https://server-healthcare.vercel.app/userRecord/data/'+value)
        .then((res)=>{
            setData(res.data.reverse());
            setLoading(false);
        }) 
        .catch((err)=>{
            Alert.alert(
                "Error",
                "Error in getting user Record",
                [{
                    text: "OK",
                }]
            )
        })
    });

    const handleDelete=(date:any)=>{
        Alert.alert(
            "Delete Record",
            "Are you sure you want to delete this record?",
            [
                {
                    text: "ok",
                    onPress:()=>{
                        axios.delete('http://192.168.1.10:3030/userRecord/data/delete/'+value+"/"+date)
                        .then(()=>{true})
                        .catch(()=>{false})
                    }
                },
                {
                    text:"cancel"
                }
            ]
        )
    }

    const renderItem =({item}:any)=>{
        return(
            <View className="flex flex-row bg-slate-300 py-3 rounded-xl my-2 shadow-sm shadow-slate-900 mx-3">
                <Text className="text-[#142850] text-lg w-28 text-center ml-5">{item.date}</Text>
                <Text className="text-[#142850] text-lg w-36 text-center">
                    {item.bp}
                </Text>
                <Text className="text-[#142850] text-lg w-40 text-center">
                    {item.sugar} mg/dL
                </Text>
                <Text className="text-[#142850] text-lg w-20 text-center">
                    {item.pulse} BPM
                </Text>
                <View className="mx-5">
                    <MaterialIcons name="delete" size={28} color="red" onPress={()=>handleDelete(item.date)}/>
                </View>
            </View>
        )
    }

    return (
        <>
            {
                loading?<LoadingScreen/>:
                <ScrollView showsVerticalScrollIndicator={false} className="h-max mx-5">
                    <View>
                        {
                            data.length>0?
                            <>
                                <View className="flex items-center justify-center">
                                    <View className="w-full"><Text className="text-2xl font-bold mt-4 mb-3">Search by Date</Text></View>
                                    <View className="w-[90%] ">
                                        <Text className="font-semibold text-slate-900 text-xl w-full text-left">Date</Text>
                                        <View className="bg-slate-200 px-5 py-1 mt-3 mb-4 rounded-full flex items-center justify-start flex-row">
                                            <AntDesign name="calendar" size={24} color="blue" />
                                            <Text className="my-2 text-lg w-[90%] ml-3 text-slate-600" onPress={()=>{setCalendar(true)}}>{date?date:"Select a Date"}</Text>
                                        </View>
                                        {
                                            calendar &&
                                            <Calendar
                                                maxDate={new Date().toDateString()}
                                                onDayPress={(day: any)=>{
                                                    setCalendar(false);
                                                    setDate(day.dateString);
                                                }}
                                                className="w-[80vw] py-3 px-5 mb-5 shadow-md rounded-xl shadow-slate-800"
                                            />
                                        }
                                        {date && <ByDate data={data} date={date} />}
                                    </View>
                                </View>
                                <View className="mt-5 ml-4">
                                    <Text className="text-lg font-bold">Your Records</Text>
                                </View>
                                <ScrollView horizontal={true} showsVerticalScrollIndicator={true} className="w-full h-max mt-2 mb-20">
                                    <View className="flex items-center justify-around flex-col w-full">
                                        <View className="px-3">
                                            <View className="flex justify-around items-center flex-row bg-[#142850] w-full py-3 px-6 rounded-xl my-2 shadow-lg shadow-slate-900">
                                                <Text className="text-white font-extrabold text-xl w-28 text-center">Date</Text>
                                                <Text className="text-white font-extrabold text-xl w-36 text-center">Blood Pressure</Text>
                                                <Text className="text-white font-extrabold text-xl w-40 text-center">Blood Sugar</Text>
                                                <Text className="text-white font-extrabold text-xl w-20 text-center">Pulse</Text>
                                                <Text className="text-white font-extrabold text-xl w-10 text-center">{" "} </Text>
                                            </View>
                                        </View>
                                        <FlatList 
                                            className="w-full"
                                            data={data}
                                            renderItem={renderItem}
                                            keyExtractor={(item:any, index) => index.toString()}
                                        />
                                    </View>
                                </ScrollView>
                            </>
                            :<View className="w-full"><Text className="text-red-600 text-xl font-bold text-center mt-5">No Record Found <Entypo name="emoji-sad" size={24} color="#dc2626" /></Text></View>
                        }
                    </View>
                </ScrollView>
            }
        </>
    );
};

export default History;
