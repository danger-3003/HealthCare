import { Text, TextInput, View } from "react-native";
import { useUserContext } from "../../../Context/User/UserContext";
import { useEffect, useState } from "react";
import axios from "axios";

const ProfileContext = () => {
    const {value} = useUserContext();
    const [user, setUser] = useState({});
    const [readOnly, setReadOnly] = useState(true);
    const [editColor, setEditColor] = useState('text-slate-800');
    useEffect(()=>{
        axios.get(`https://server-healthcare.vercel.app/user_data/getUser/${value}`)
        // 192.168.1.10
        .then((response)=>{setUser(response.data)})
        .catch((err)=>{console.log(err)});
    },[value])
    
    const handleSave=()=>{
        console.log(user);
        setReadOnly(true);
        setEditColor("text-slate-800");
        axios.put(`http://192.168.1.10:3030/user_data/updateUser/${user.name}`,user)
        .then((res)=>{console.log(res)})
        .catch(()=>{console.log("error in uodating user")});
    }

    return (
        <View>
            <View className="m-5">
                <View className="flex items-center justify-between flex-row">
                    <View>
                        <Text className="text-3xl font-bold">{user.name} <Text className="text-slate-400">(You)</Text></Text>
                        <View className="flex flex-row">
                            <Text className="text-lg">{user.dob}</Text>
                            <Text className="ml-10 text-lg"><Text className="font-medium">age:</Text>{user.age}</Text>
                        </View>
                    </View>
                    <View className="">
                        <Text className="text-red-500 font-extrabold text-xl" onPress={()=>{setReadOnly(false);setEditColor("text-red-500")}}>Edit</Text>
                    </View>
                </View>
                <View>
                    <View className="flex items-center justify-between flex-row">
                        <Text>Username</Text>
                        <TextInput 
                            value={user.name}
                            editable={false}
                            className="text-slate-400"
                        /> 
                    </View>
                    <View className="flex items-center justify-between flex-row">
                        <Text>Email</Text>
                        <TextInput 
                            value={user.email}
                            editable={false}
                            className="text-slate-400"
                        />
                    </View>
                    <View className="flex items-center justify-between flex-row">
                        <Text>Date of Birth</Text>
                        <TextInput 
                            value={user.dob}
                            editable={!readOnly}
                            className={`${editColor}`}
                            onChangeText={(text)=>{setUser({...user,dob:text})}}
                        />
                    </View>
                    <View className="flex items-center justify-between flex-row">
                        <Text>Age (yrs)</Text>
                        <TextInput 
                            value={user.age}
                            editable={!readOnly}
                            className={`${editColor}`}
                            onChangeText={(text)=>{setUser({...user,age:text})}}
                        />
                    </View>
                    <View className="flex items-center justify-between flex-row">
                        <Text>Blood Group</Text>
                        <TextInput 
                            value={user.bloodGroup}
                            editable={!readOnly}
                            className={`${editColor}`}
                            onChangeText={(text)=>{setUser({...user,bloodGroup:text})}}
                        />
                    </View>
                    <View className="flex items-center justify-between flex-row">
                        <Text>Height (cms)</Text>
                        <TextInput 
                            value={user.height}
                            editable={!readOnly}
                            className={`${editColor}`}
                            onChangeText={(text)=>{setUser({...user,height:text})}}
                        />
                    </View>
                    <View className="flex items-center justify-between flex-row">
                        <Text>Weight (KG)</Text>
                        <TextInput 
                            value={user.weight}
                            editable={!readOnly}
                            className={`${editColor}`}
                            onChangeText={(text)=>{setUser({...user,weight:text})}}
                        />
                    </View>
                </View>
                {!readOnly &&
                    <Text className="text-green-600 font-extrabold text-xl text-right mt-2" onPress={handleSave}>Save</Text>
                }
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
