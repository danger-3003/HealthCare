import { View, Text } from "react-native";
import Card from "./card";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const services = (props:any) => {

    let totalSugar=0;
    let totalPulse=0;
    let totalSys=0;
    let totalDys=0;
    let bp=[];
    props.data.length>0?
    props.data.map((item:any)=>{
        bp=item.bp.split("/");
        totalSys+=Number(bp[0]);
        totalDys+=Number(bp[1]);
        totalSugar+=item.sugar;
        totalPulse+=item.pulse;
    })
    :console.log("No Records Found");

    return (
        <>
            <Card text={`${totalSys/props.data.length}/${totalDys/props.data.length}`} bg="bg-red-300" color="text-lg text-slate-700" icon={<FontAwesome5 name="heartbeat" size={24} color="red" />} heading="BP" headColor="text-red-700"/>
            <Card text={totalPulse/props.data.length} bg="bg-cyan-300" color="text-slate-700 text-xl" icon={<Fontisto name="heartbeat-alt" size={24} color="#172554" />} heading="Pulse" headColor="text-cyan-700"/>
            <Card text={totalSugar/props.data.length} bg="bg-green-300" color="text-slate-700 text-xl" icon={<MaterialCommunityIcons name="diabetes" size={24} color="green" />} heading="Sugar" headColor="text-green-700"/>
        </>
    );
};

export default services;