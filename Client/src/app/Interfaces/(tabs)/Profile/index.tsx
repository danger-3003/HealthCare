import { Text, TextInput, View, TouchableOpacity, ScrollView } from "react-native";
import { useUserContext } from "../../../Context/User/UserContext";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingScreen from "../../components/Loading";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';

const ProfileContext = () => {
    const {value}:any = useUserContext();
    const [user, setUser] = useState({});
    const [readOnly, setReadOnly] = useState(true);
    const [editColor, setEditColor] = useState('text-slate-900');
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        axios.get(`https://server-healthcare.vercel.app/user_data/getUser/${value}`)
        // 192.168.1.10
        .then((response)=>{setUser(response.data);setLoading(false);})
        .catch((err)=>{console.log(err)});
    },[value]);
    
    const handleSave=()=>{
        console.log(user);
        setReadOnly(true);
        setEditColor("text-slate-800");
        axios.put(`https://server-healthcare.vercel.app/user_data/updateUser/${user.name}`,user)
        .then((res)=>{console.log(res);setLoading(false);})
        .catch(()=>{});
    }

    const handleLogOut=()=>{
        router.replace({
            pathname: "../../../",
        });
    }

    const BMI= (user.weight/(Math.pow((user.height/100),2))).toFixed(2);
    let bmiCategory = '';
    let text_color = '';
    if(Number(BMI) < 18.5)
    {
        bmiCategory = 'Underweight';
        text_color = "text-red-400 font-bold";
    }else if(Number(BMI) >= 18.5 && Number(BMI) < 25)
    {
        bmiCategory = 'Normal weight';
        text_color = "text-green-400 font-bold";
    }else if(Number(BMI) >= 25 && Number(BMI) < 30)
    {
        bmiCategory = 'Overweight';
        text_color = "text-red-400 font-bold";
    }else if(Number(BMI) >= 30)
    {
        bmiCategory = 'Obese';
        text_color = "text-red-600 font-extrabold";
    }

    return (
        <>
            {
                loading?
                <LoadingScreen />:
                <ScrollView>
                    <View className="mx-5 mt-5">
                        <View className="bg-slate-900 h-0.5 w-full rounded-full"></View>
                        <View className="flex items-center justify-between flex-row my-7">
                            <View>
                                <Text className="text-3xl font-bold">{user.name} <Text className="text-slate-400 text-lg">(You)</Text></Text>
                                <View className="flex flex-row">
                                    <Text className="text-lg">{user.dob}</Text>
                                    <Text className="ml-10 text-lg"><Text className="font-medium">age:</Text>{user.age}</Text>
                                </View>
                            </View>
                        </View>
                        <View className="bg-slate-900 h-0.5 w-full rounded-full"></View>
                        <View className="my-7 w-full">
                            <TouchableOpacity className="absolute right-0 bg-red-500 px-7 py-0.5 rounded-full shadow-md shadow-slate-900"
                                onPress={()=>{setReadOnly(false);setEditColor("text-red-500 bg-slate-200 w-[60%]")}}
                                style={{
                                    borderBottomLeftRadius:40,
                                    borderTopRightRadius:40,
                                    borderTopStartRadius:10,
                                    borderBottomEndRadius:10
                                }}
                            >
                                <View>
                                    <Text className="text-white font-extrabold text-xl">Edit {" "}<FontAwesome5 name="user-edit" size={18} color="white" /></Text>
                                </View>
                            </TouchableOpacity>
                            <View className="flex items-center justify-between flex-row mt-12">
                                <Text className="font-bold text-lg text-slate-800">Username</Text>
                                <TextInput 
                                    value={user.name}
                                    editable={false}
                                    className="text-slate-400 text-lg font-medium"
                                /> 
                            </View>
                            <View className="flex items-center justify-between flex-row my-2">
                                <Text className="font-bold text-lg text-slate-800">Email</Text>
                                <TextInput 
                                    value={user.email}
                                    editable={false}
                                    className="text-slate-400 text-lg font-medium"
                                />
                            </View>
                            <View className="flex items-center justify-between flex-row my-2">
                                <Text className="font-bold text-lg text-slate-800">Date of Birth</Text>
                                <TextInput 
                                    value={user.dob}
                                    editable={!readOnly}
                                    className={`${editColor} text-lg font-medium`}
                                    onChangeText={(text)=>{setUser({...user,dob:text})}}
                                />
                            </View>
                            <View className="flex items-center justify-between flex-row my-2">
                                <Text className="font-bold text-lg text-slate-800">Age (yrs)</Text>
                                <View className="flex flex-row justify-end">
                                    <TextInput 
                                        value={user.age}
                                        editable={!readOnly}
                                        keyboardType="decimal-pad"
                                        className={`${editColor} text-lg font-medium`}
                                        onChangeText={(text)=>{setUser({...user,age:text})}}
                                    />
                                    <Text className="text-lg font-medium"> Yrs</Text>
                                </View>
                            </View>
                            <View className="flex items-center justify-between flex-row my-2">
                                <Text className="font-bold text-lg text-slate-800">Blood Group</Text>
                                <View className="flex flex-row justify-end">
                                    <TextInput 
                                        value={user.bloodGroup}
                                        editable={!readOnly}
                                        className={`${editColor} text-lg font-medium`}
                                        onChangeText={(text)=>{setUser({...user,bloodGroup:text})}}
                                    />
                                    <Text className="text-lg font-medium"> ve</Text>
                                </View>
                            </View>
                            <View className="flex items-center justify-between flex-row my-2">
                                <Text className="font-bold text-lg text-slate-800">Height (cms)</Text>
                                <View className="flex flex-row justify-end">
                                    <TextInput 
                                        value={user.height}
                                        editable={!readOnly}
                                        keyboardType="decimal-pad"
                                        className={`${editColor} text-lg font-medium`}
                                        onChangeText={(text)=>{setUser({...user,height:text})}}
                                    />
                                    <Text className="text-lg font-medium"> cms</Text>
                                </View>
                            </View>
                            <View className="flex items-center justify-between flex-row my-2">
                                <Text className="font-bold text-lg text-slate-800">Weight (KG)</Text>
                                <View className="flex flex-row justify-end">
                                    <TextInput 
                                        value={user.weight}
                                        editable={!readOnly}
                                        keyboardType="decimal-pad"
                                        className={`${editColor} text-lg font-medium`}
                                        onChangeText={(text)=>{setUser({...user,weight:text})}}
                                    />
                                    <Text className="text-lg font-medium"> Kg</Text>
                                </View>
                            </View>
                            <View className="flex items-center justify-between flex-row my-2">
                                <Text className="font-bold text-lg text-slate-800">BMI</Text>
                                <TextInput 
                                    value={`${BMI.toString()} (${bmiCategory})`}
                                    editable={false}
                                    className={`${text_color} text-lg font-medium`}
                                />
                            </View>
                            <View className="flex items-end">
                                {!readOnly &&
                                <TouchableOpacity  className=" bg-green-500 px-6 py-0.5 shadow-md shadow-slate-900 my-5"
                                    onPress={handleSave}
                                    style={{
                                        borderBottomLeftRadius:40,
                                        borderTopRightRadius:40,
                                        borderTopStartRadius:10,
                                        borderBottomEndRadius:10
                                    }}
                                    >
                                    <View>
                                        <Text className="text-white font-extrabold text-xl">Save {" "}<Feather name="upload" size={22} color="white" /></Text>
                                    </View>
                                </TouchableOpacity>
                                }
                            </View>
                        </View>
                        <View className="bg-slate-900 h-0.5 w-full rounded-full -mt-4"></View>
                    </View>
                    <TouchableOpacity className="bg-red-500 p-3 m-5 shadow-md shadow-slate-700"
                        onPress={handleLogOut}
                        style={{
                            borderBottomLeftRadius:40,
                            borderTopRightRadius:40,
                            borderTopStartRadius:10,
                            borderBottomEndRadius:10
                        }}
                        >
                        <View>
                            <Text className="text-white font-extrabold text-xl text-center">Log Out <MaterialCommunityIcons name="logout" size={24} color="white" /></Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            }
        </>
    );
};

const Profile=()=>{
    return(
        <ProfileContext />
    );
}

export default Profile;