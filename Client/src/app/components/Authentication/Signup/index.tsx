import {SafeAreaView, View, Text, TouchableOpacity, Pressable, TextInput, StatusBar } from "react-native";
import { Link, router } from "expo-router";
import React from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faEnvelope } from '@fortawesome/free-regular-svg-icons'
import {faUnlock} from '@fortawesome/free-solid-svg-icons'

export default function Signup() {

    const handleSignup=()=>{
        console.log("Signup");
        axios.get('http://127.0.0.1:3000/')
        .then((res)=>{console.log(res)})
        .catch(()=>{console.log("error in connecting DB")})
        router.push({
            pathname:'../Signin'
        })
    }

    return (
        <SafeAreaView>
            <StatusBar
                barStyle="light-content" // Use "light-content" for white text/icons
                backgroundColor="#000"   // Set the status bar background color to black
            />
            <View style={{borderBottomStartRadius:100}} className="bg-slate-950 w-full h-max pt-10 pb-5 px-10">
                {/* <Link href={"../../"} className="text-white font-bold text-lg">&lt;-</Link> */}
                <View className="py-5">
                    <Text className="text-white text-lg text-right font-bold ml-1">Create Your Account</Text>
                    <Text className="text-white text-5xl text-right font-extrabold py-3">Sign Up</Text>
                </View>
            </View>
            <View className="flex items-center justify-center w-screen">
                <View className="flex items-center justify-center w-full pt-10 pb-5">
                    <View className="w-[80%]">
                        <Text className="text-xl font-bold text-slate-900 py-2">Username</Text>
                        <View className="h-14 px-5 py-1 bg-slate-200 rounded-full text-slate-950 flex flex-row items-center justify-start">
                            <View><FontAwesomeIcon icon={faUser}/></View>
                            <TextInput
                                className="text-lg text-slate-950 pl-3" 
                                placeholder="Enter your username"
                                onChangeText={(text) => console.log(text)}
                            />
                        </View>
                    </View>
                    <View className="w-[80%]">
                        <Text className="text-xl font-bold text-slate-900 py-2">Email</Text>
                        <View className="h-14 px-5 py-1 bg-slate-200 rounded-full text-slate-950 flex flex-row items-center justify-start">
                            <View><FontAwesomeIcon icon={faEnvelope}/></View>
                            <TextInput
                                className="text-lg text-slate-950 pl-3" 
                                placeholder="Enter your email"
                                onChangeText={(text) => console.log(text)}
                            />
                        </View>
                    </View>
                    <View className="w-[80%]">
                        <Text className="text-xl font-bold text-slate-900 py-2">Password</Text>
                        <View className="h-14 px-5 py-1 bg-slate-200 rounded-full text-slate-950 flex flex-row items-center justify-start">
                            <View><FontAwesomeIcon icon={faUnlock}/></View>
                            <TextInput
                                className="text-lg text-slate-950 pl-3" 
                                secureTextEntry={true}
                                placeholder="Enter your password"
                                onChangeText={(text) => console.log(text)}
                            />
                        </View>
                    </View>
                    <Pressable onPress={()=>{console.log("pressed")}}>
                        <View className="w-[80%]">
                            <Text className="text-right pt-2 mr-5">Forgot Password</Text>
                        </View>
                    </Pressable>
                </View>
                <TouchableOpacity className="w-[80%]">
                    <View className="bg-slate-900 w-full h-max px-5 py-3 rounded-full">
                        <Pressable onPress={handleSignup}>
                            <Text className="text-white text-xl text-center font-bold">Sign Up</Text>
                        </Pressable>
                    </View>
                </TouchableOpacity>
                <View className="py-2">
                    <Pressable>
                        <Text className="text-base">Already have an account? <Link href={'../Signin'} className="text-blue-500">Sign In</Link></Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}
