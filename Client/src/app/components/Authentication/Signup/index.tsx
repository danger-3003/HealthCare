import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Pressable,
    TextInput,
    StatusBar,
} from "react-native";
import { Link, router } from "expo-router";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faUnlock } from "@fortawesome/free-solid-svg-icons";

export default function Signup() {
    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const [userExist, setUserExist] = useState(false);
    const [signup, setSignup] = useState(false);
    const handleSignup = () => {
        axios.post("http://192.168.1.10:3030/setUser",user)
        .then((res)=>{
            if(res.data == 'User Already Exists')
            {
                setUserExist(true);
                setTimeout(()=>{
                    setUserExist(false);
                    router.push({
                        pathname:'../Signin'
                    })
                },1000)
            }
            else
            {
                setSignup(true);
                setTimeout(()=>{
                    setSignup(false);
                },2000)
                console.log('Sign Up ')
            }
        })
        .catch((err)=>{console.log(err)})
        setUser({...user,name:"",email:"",password:""})
    };

    return (
        <SafeAreaView>
            <StatusBar
                barStyle="light-content" // Use "light-content" for white text/icons
                backgroundColor="#000" // Set the status bar background color to black
            />
            <View
                style={{ borderBottomStartRadius: 100 }}
                className="bg-slate-950 w-full h-max pt-10 pb-5 px-10"
            >
                <View className="py-5">
                    <Text className="text-white text-lg text-right font-bold ml-1">
                        Create Your Account
                    </Text>
                    <Text className="text-white text-5xl text-right font-extrabold py-3">
                        Sign Up
                    </Text>
                </View>
                {
                    userExist && 
                    <View className="flex items-center justify-center">
                        <View className="bg-red-400 px-5 py-3 h-max w-[80%] rounded-md absolute top-0">
                            <Text className="text-white font-bold text-lg text-center">User Already Exists !!!</Text>
                        </View>
                    </View>
                }
                {
                    signup && 
                    <View className="flex items-center justify-center">
                        <View className="bg-green-400 px-5 py-3 h-max w-[80%] rounded-md absolute top-0">
                            <Text className="text-white font-bold text-lg text-center">Sign Up Successfull.</Text>
                        </View>
                    </View>
                }
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
                                className="text-lg text-slate-950 pl-3"
                                placeholder="Enter your email"
                                onChangeText={(text) => {
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
                                className="text-lg text-slate-950 pl-3"
                                secureTextEntry={true}
                                placeholder="Enter your password"
                                onChangeText={(text) =>
                                    setUser({ ...user, password: text })
                                }
                            />
                        </View>
                    </View>
                    <Pressable
                        onPress={() => {
                            console.log("Forgot Password");
                        }}
                        className="w-[80%]"
                    >
                        <View className="w-full">
                            <Text className="text-right pt-2 mr-2">
                                Forgot Password
                            </Text>
                        </View>
                    </Pressable>
                </View>
                <TouchableOpacity className="w-[80%]">
                    <View className="bg-slate-900 w-full h-max px-5 py-3 rounded-full">
                        <Pressable onPress={handleSignup}>
                            <Text className="text-white text-xl text-center font-bold">
                                Sign Up
                            </Text>
                        </Pressable>
                    </View>
                </TouchableOpacity>
                <View className="py-2">
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
        </SafeAreaView>
    );
}
