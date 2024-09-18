import { Text, TextInput, View } from "react-native";
import { useUserContext } from "../../../Context/User/UserContext";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingScreen from "../../components/Loading";

const ProfileContext = () => {
    const {value}:any = useUserContext();
    const [user, setUser] = useState({});
    const [readOnly, setReadOnly] = useState(true);
    const [editColor, setEditColor] = useState('text-slate-800');
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
                            <View className="flex items-center justify-between flex-row">
                                <Text>BMI</Text>
                                <TextInput 
                                    value={`${BMI.toString()} (${bmiCategory})`}
                                    editable={!readOnly}
                                    className={`${text_color}`}
                                />
                            </View>
                        </View>
                        {!readOnly &&
                            <Text className="text-green-600 font-extrabold text-xl text-right mt-2" onPress={handleSave}>Save</Text>
                        }
                    </View>
                    <View>
                        <Text onPress={handleLogOut}>Log Out</Text>
                    </View>
                </View>
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
