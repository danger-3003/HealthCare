import { Text, View } from "react-native";
import { useUserContext } from "../../../Context/User/UserContext";
import { useEffect, useState } from "react";
import axios from "axios";

const ProfileContext = () => {
    const {value} = useUserContext();
    const [user, setUser] = useState({});
    useEffect(()=>{
        axios.get(`http://192.168.1.10:3030/user_data/getUser/${value}`)
        .then((response)=>{setUser(response.data)})
        .catch((err)=>{console.log(err)});
    })
    
    return (
        <View>
            <View className="m-5">
                <Text className="text-3xl font-bold w-screen">{user.name} <Text className="text-gray-500">(You)</Text></Text>
                <View className="flex flex-row">
                    <Text className="text-lg">30/03/2003</Text>
                    <Text className="ml-10 text-lg"><Text className="font-medium">age:</Text>{" "} 21</Text>
                </View>
                <View>
                    <Text>{user.name}</Text>
                    <Text>{user.email}</Text>
                </View>
            </View>
        </View>
    );
};

const Profile=()=>{
    return(
        <ProfileContext />
    );
}

export default Profile;
