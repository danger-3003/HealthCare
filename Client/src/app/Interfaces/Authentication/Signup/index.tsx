import { Alert, SafeAreaView, View, Text, TouchableOpacity, ScrollView, Pressable, TextInput, StatusBar } from "react-native";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faUnlock } from "@fortawesome/free-solid-svg-icons";
import RadioGroup from "react-native-radio-buttons-group";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import LottieView from "lottie-react-native";

export default function Signup() {
    const [user, setUser] = useState({ name: "", email: "", password: "", gender:"", dob:"", bloodGroup:"", age:"", height:"", weight:"" });
    const [genderId, setGenderID] = useState("");
    const [datePicker, setDatePicker] = useState(false);
    const date = new Date();
    const [loading, setLoading] = useState(false);
    const genderOptions = [
        {
            id: '1',
            label: 'male',
            value:'male'
        },
        {
            id: '2',
            label:'female',
            value:'female'
        },
        {
            id: '3',
            label: 'others',
            value:'others'
        }]
    const handleSignup = () => {
        user.name = user.name.trim();
        if (user.name.trim() === "" || user.password.trim() === "" || user.email.trim() === "" )
        {
            alert("Please fill all the fields");
            return;
        }
        setLoading(true);
        axios.post("https://server-healthcare.vercel.app/user/setUser",user)
        // 192.168.1.10
        .then((res)=>{
            if(res.data == 'User Already Exists')
            {
                Alert.alert(
                    "User Already Exists",
                    "Please SignIn to continue...",
                    [
                        {
                            text: "SignIn",
                            onPress: () =>
                                router.replace({
                                    pathname: "../Signin",
                                }),
                            style: "default",
                        },
                    ]
                );
            }
            else
            {
                Alert.alert(
                    "User created Successfully",
                    "Click 'OK' to continue...",
                    [
                        {
                            text: "OK",
                            onPress: () =>
                                router.replace({
                                    pathname:'../../(tabs)/',
                                    params:{userID:user.name}
                                }),
                            style: "default",
                        },
                    ]
                );
            }
            setLoading(false);
        })
        .catch((err)=>{console.log(err)})
        setUser({...user,name: "", email: "", password: "", gender:"", dob:"", bloodGroup:"", age:"", height:"", weight:""})
    };

    return (
        <SafeAreaView>
            <StatusBar
                barStyle="light-content" // Use "light-content" for white text/icons
                backgroundColor="#000" // Set the status bar background color to black
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{ borderBottomStartRadius: 100 }}
                    className="bg-slate-950 w-full h-max pt-10 pb-5 px-10 flex items-center flex-row justify-between"
                >
                    {
                        loading && 
                        <View className="-mt-4">
                            <LottieView 
                                source={{uri:"https://lottie.host/ec975ba1-6fc3-44f1-acac-91938720a2d5/PF93s0yFj0.json"}}
                                autoPlay
                                loop
                                speed={3}
                                style={{height:100,width:100}}
                            />
                        </View>
                    }
                    <View className="py-5">
                        <Text className="text-white text-lg text-right font-bold ml-1">
                            Create Your Account
                        </Text>
                        <Text className="text-white text-5xl text-right font-extrabold py-3">
                            Sign Up
                        </Text>
                    </View>
                </View>
                <View className="flex items-center justify-center w-screen">
                    <View className="flex items-center justify-center w-full pt-10 pb-5">
                        <View className="w-[80%]">
                            <Text className="text-xl font-bold text-slate-900 py-2">
                                Username
                            </Text>
                            <View className="h-14 px-5 py-1 bg-slate-200 rounded-full text-slate-950 flex flex-row items-center justify-start">
                                <View>
                                    <FontAwesomeIcon icon={faUser} />
                                </View>
                                <TextInput
                                    value={user.name}
                                    keyboardAppearance="default"
                                    className="text-lg text-slate-950 pl-3"
                                    placeholder="Enter your username"
                                    onChangeText={(text) => {
                                        setUser({ ...user, name: text });
                                    }}
                                />
                            </View>
                        </View>
                        <View className="w-[80%]">
                            <Text className="text-xl font-bold text-slate-900 py-2">
                                Email
                            </Text>
                            <View className="h-14 px-5 py-1 bg-slate-200 rounded-full text-slate-950 flex flex-row items-center justify-start">
                                <View>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </View>
                                <TextInput
                                    value={user.email}
                                    keyboardAppearance="default"
                                    className="text-lg text-slate-950 pl-3"
                                    placeholder="Enter your email"
                                    onChangeText={(text) => {
                                        text.trim();
                                        setUser({ ...user, email: text });
                                    }}
                                />
                            </View>
                        </View>
                        <View className="w-[80%]">
                            <Text className="text-xl font-bold text-slate-900 py-2">
                                Password
                            </Text>
                            <View className="h-14 px-5 py-1 bg-slate-200 rounded-full text-slate-950 flex flex-row items-center justify-start">
                                <View>
                                    <FontAwesomeIcon icon={faUnlock} />
                                </View>
                                <TextInput
                                    value={user.password}
                                    keyboardAppearance="default"
                                    className="text-lg text-slate-950 pl-3"
                                    secureTextEntry={true}
                                    placeholder="Enter your password"
                                    onChangeText={(text) =>
                                        setUser({ ...user, password: text })
                                    }
                                />
                            </View>
                        </View>
                        <View className="w-[80%]">
                            <Text className="text-xl font-bold text-slate-900 py-2">
                                Gender
                            </Text>
                            <View className="h-max px-5">
                                <RadioGroup 
                                    radioButtons={genderOptions} 
                                    onPress={(value)=>{
                                        const option=genderOptions.find(item => item.id === value);
                                        setUser({ ...user, gender: option.value });
                                        setGenderID(value);
                                    }}
                                    selectedId={genderId}
                                    layout="row"
                                />
                            </View>
                        </View>
                        <View className="w-[80%]">
                            <Text className="text-xl font-bold text-slate-900 py-2">
                                Date of Birth
                            </Text>
                            <View>
                                <Text className="h-14 px-6 py-3 bg-slate-200 rounded-full text-lg text-slate-950" onPress={()=>setDatePicker(true)}>{user.dob?user.dob:"Select your DOB"}</Text>
                                <DateTimePickerModal
                                    isVisible={datePicker}
                                    mode="date"
                                    display="spinner"
                                    date={date}
                                    onConfirm={(selectedDate)=>{setUser({...user,dob:selectedDate.toLocaleDateString()});setDatePicker(false)}}
                                    onCancel={()=>setDatePicker(false)}
                                />
                            </View>
                        </View>
                        <View className="flex justify-start items-center flex-row w-[80%]">
                            <View className="w-[45%] mr-7">
                                <Text className="text-xl font-bold text-slate-900 py-2">
                                    Blood Group
                                </Text>
                                <View className="h-14 px-5 py-1 bg-slate-200 rounded-full text-slate-950 flex flex-row items-center justify-start">
                                    <View>
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </View>
                                    <TextInput
                                        value={user.bloodGroup}
                                        keyboardAppearance="default"
                                        className="text-lg text-slate-950 pl-3"
                                        placeholder="Group"
                                        onChangeText={(text) => {
                                            text.trim();
                                            setUser({ ...user, bloodGroup: text });
                                        }}
                                    />
                                </View>
                            </View>
                            <View className="w-[45%]">
                                <Text className="text-xl font-bold text-slate-900 py-2">
                                    Age
                                </Text>
                                <View className="h-14 px-5 py-1 bg-slate-200 rounded-full text-slate-950 flex flex-row items-center justify-start">
                                    <View>
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </View>
                                    <TextInput
                                        value={user.age}
                                        keyboardAppearance="default"
                                        className="text-lg text-slate-950 pl-3"
                                        placeholder="yrs"
                                        keyboardType="decimal-pad"
                                        onChangeText={(text) => {
                                            text.trim();
                                            setUser({ ...user, age: text });
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                        <View className="flex justify-start items-center flex-row w-[80%]">
                            <View className="w-[45%] mr-7">
                                <Text className="text-xl font-bold text-slate-900 py-2">
                                    Heigth
                                </Text>
                                <View className="h-14 px-5 py-1 bg-slate-200 rounded-full text-slate-950 flex flex-row items-center justify-start">
                                    <View>
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </View>
                                    <TextInput
                                        value={user.height}
                                        keyboardAppearance="default"
                                        className="text-lg text-slate-950 pl-3"
                                        placeholder="in cms"
                                        keyboardType="decimal-pad"
                                        onChangeText={(text) => {
                                            text.trim();
                                            setUser({ ...user, height: text });
                                        }}
                                    />
                                </View>
                            </View>
                            <View className="w-[45%]">
                                <Text className="text-xl font-bold text-slate-900 py-2">
                                    Weight
                                </Text>
                                <View className="h-14 px-5 py-1 bg-slate-200 rounded-full text-slate-950 flex flex-row items-center justify-start">
                                    <View>
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </View>
                                    <TextInput
                                        value={user.weight}
                                        keyboardAppearance="default"
                                        className="text-lg text-slate-950 pl-3"
                                        placeholder="in KGs"
                                        keyboardType="decimal-pad"
                                        onChangeText={(text) => {
                                            text.trim();
                                            setUser({ ...user, weight: text });
                                        }}
                                    />
                                </View>
                            </View>                        
                        </View>
                    </View>
                    <TouchableOpacity className="w-[80%]" onPress={handleSignup}>
                        <View 
                            className="bg-slate-900 w-full h-max px-5 py-3"
                            style={{
                                borderTopEndRadius:40,
                                borderBottomStartRadius:40,
                                borderBottomEndRadius:10,
                                borderTopLeftRadius:10
                            }}
                        >
                            <Text className="text-white text-xl text-center font-bold">
                                Sign Up
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View className="py-2 mb-5">
                        <Pressable>
                            <Text className="text-base">
                                Already have an account?{" "}
                                <Link href={"../Signin"} className="text-blue-500">
                                    Sign In
                                </Link>
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
