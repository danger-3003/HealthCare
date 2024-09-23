import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";

const DashboardCard = (props:any) => {
    const [data,setData]:any=useState([]);
    useEffect(()=>{
        setData(props.data);
    });
    let bp = [];
    
    return (
        <View className="flex items-center justify-center bg-slate-200 w-full h-56 my-3 rounded-3xl shadow-lg shadow-zinc-300">
            <Text>DashboardCard</Text>
        </View>
    );
};

export default DashboardCard;
