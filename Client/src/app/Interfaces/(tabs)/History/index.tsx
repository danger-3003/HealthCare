import { StyleSheet, Text, View } from "react-native";
import { useUserContext } from "@/src/app/Context/User/UserContext";
import {useEffect, useState} from "react";
import axios from "axios";

const History = () => {
    const {value}:any=useUserContext();
    const [data, setData]:any = useState();
    useEffect(()=>{
        axios.get('http://192.168.1.10:3030/userRecord/data/'+value)
        .then((res)=>{
            setData(res.data);
        }) 
        .catch((err)=>{console.log(err)})
    },[])
    return (
        <View>
            <Text>Hello</Text>
            <Text>{value}</Text>
            {
                data && data.find((record: any)=>{
                    <Text>{record.date}</Text>
                })
            }
        </View>
    );
};

export default History;
