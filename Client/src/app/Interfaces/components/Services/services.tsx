import { View, Text } from "react-native";
import Card from "./card";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import axios from "axios";
import Entypo from "@expo/vector-icons/Entypo";

const services = (props:any) => {

    const [data,setData]=useState([]);
    const [noData,setNoData] = useState(false);
    useEffect(()=>{
        axios.get("https://server-healthcare.vercel.app/userRecord/data/"+props.user)
        //axios.get("http://192.168.1.10:3030/userRecord/data/"+userID)
        .then((res)=>{
            if(res.data.length>0)setData(res.data.reverse());
            else setNoData(true);
        })
        .catch(()=>{alert("Error in Getting User Record")});
    })
    let totalSugar=0;
    let totalPulse=0;
    let totalSys=0;
    let totalDys=0;
    let bp=[];
    let count=0;
    data.length>0?
    data.map((item:any)=>{
        bp=item.bp.split("/");
        totalSys+=Number(bp[0]);
        totalDys+=Number(bp[1]);
        if(item.sugar===null){
            count+=1;
        }
        totalSugar+=item.sugar;
        totalPulse+=item.pulse;
    })
    :<></>

    return (
        <>
            {
                noData?
                <View className="w-full">
                    <Text className="text-red-600 text-xl font-bold text-center">
                        No Record Found{" "}
                        <Entypo name="emoji-sad" size={24} color="#dc2626" />
                    </Text>
                </View>:
                <>
                    <Card text={`${(totalSys/data.length).toFixed(1)}/${(totalDys/data.length).toFixed(1)}`} bg="bg-red-300" size="17" color="mt-4 text-slate-700" icon={<FontAwesome5 name="heartbeat" size={24} color="red" />} heading="BP" headColor="text-red-700"/>
                    <Card text={(totalPulse/data.length).toFixed(1)} bg="bg-cyan-300" color="text-slate-700" size="20" icon={<Fontisto name="heartbeat-alt" size={24} color="#172554" />} heading="Pulse" headColor="text-cyan-700"/>
                    <Card text={(totalSugar/(data.length-count)).toFixed(1)} bg="bg-green-300" color="text-slate-700" size="20" icon={<MaterialCommunityIcons name="diabetes" size={24} color="green" />} heading="Sugar" headColor="text-green-700"/>
                </>
            }
        </>
    );
};

export default services;