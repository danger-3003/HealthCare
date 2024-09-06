import { SafeAreaView, StatusBar, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import { Link } from "expo-router";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faUnlock } from '@fortawesome/free-solid-svg-icons'

export default function Signin() {
    return (
        <SafeAreaView>
            <StatusBar
                barStyle="light-content" // Use "light-content" for white text/icons
                backgroundColor="#000"   // Set the status bar background color to black
            />
            <View style={{borderBottomEndRadius:150}} className="bg-slate-950 w-full h-max pt-10 pb-5 px-10">
                {/* <Link href={"../../"} className="text-white font-bold text-lg">&lt;-</Link> */}
                <View className="py-5">
                    <Text className="text-white text-lg font-bold ml-1">Welcome Back!</Text>
                    <Text className="text-white text-5xl font-extrabold py-3">Sign In</Text>
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
                        <Text className="text-xl font-bold text-slate-900 py-2">Username</Text>
                        <View className="h-14 px-5 py-1 bg-slate-200 rounded-full text-slate-950 flex flex-row items-center justify-start">
                            <View><FontAwesomeIcon icon={faUnlock}/></View>
                            <TextInput
                                secureTextEntry={true}
                                className="text-lg text-slate-950 pl-3" 
                                placeholder="Enter your username"
                                onChangeText={(text) => console.log(text)}
                            />
                        </View>
                    </View>
                    <TouchableWithoutFeedback onPress={()=>{console.log("pressed")}}>
                        <View className="w-[80%]">
                            <Text className="text-right pt-2 mr-5">Forgot Password</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <TouchableOpacity className="w-[80%]">
                    <View className="bg-slate-900 w-full h-max px-5 py-3 rounded-full">
                        <Text className="text-white text-xl text-center font-bold">Sign In</Text>
                    </View>
                </TouchableOpacity>
                <View className="py-2">
                    <TouchableWithoutFeedback>
                        <Text className="text-base">Didn't have an account? <Link href={'../Signup'} className="text-blue-500">Sign Up</Link></Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </SafeAreaView>
    );
}
