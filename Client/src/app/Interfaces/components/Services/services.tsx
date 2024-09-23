import { View, Text } from "react-native";
import Card from "./card";
import { useState } from "react";

const services = (props:any) => {
    const [avgBp, setAvgBp]:any = useState("");
    const [avgSugar, setAvgSugar]:any = useState("");
    const [avgPulse, setAvgPulse]:any = useState("");

    let totalSugar=0;
    let totalBp=0;
    let bp="120/80";
    let BP:any=[];
    props.data.map((item:any)=>{
        totalSugar += item.sugar;
        BP.push(bp.split("/"));
    })

    console.log(BP);

    return (
        <View>
            <Card />
        </View>
    );
};

export default services;