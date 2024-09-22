import { Alert, SafeAreaView, StatusBar, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import { Link, router } from "expo-router";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faUnlock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import LottieView from "lottie-react-native";

function SigninContext() {

    // const [user,setUser] = useState({name:"",password:""});
    const [user,setUser] = useState({name:"Sumanth Narem",password:"123456789"});
    const [loading, setLoading] = useState(false);
    const handleSignin =()=>{
        user.name = user.name.trim();
        if (user.name.trim() === "" || user.password.trim() === "") {
            alert("Please fill all the fields");
            return;
        }
        setLoading(true);
        axios.get(`https://server-healthcare.vercel.app/user/${user.name}?password=${encodeURIComponent(user.password)}`)
        // 192.168.1.10
        .then((response)=>{
            if(response.data == 'No User Found')
            {
                Alert.alert(
                    "User Not Found",
                    "Please SignUp to continue...",
                    [
                        {
                            text:"SignUp",
                            onPress:()=>router.push({
                                pathname:"../Signup/"
                            }),
                            style:"default"
                        }
                    ]
                )
                setUser({...user,name:"",password:""});
            }
            else if(response.data)
            {
                router.replace({
                    pathname:"../../(tabs)/",
                    params:{userID:user.name}
                });
                setUser({...user,name:"",password:""});
            }
            else
            {
                Alert.alert(
                    "Wrong Password",
                    "Please verify your PASSWORD",
                    [
                        {
                            text:"ok",
                            style:"default"
                        }
                    ]
                )
            }
            setLoading(false);
        })
        .catch((error)=>{
            setLoading(false);
            Alert.alert(
                "Error",
                "Please SignIn again",
                [
                    {
                        text:"ok",
                        style:"default"
                    }
                ]
            )
        });
    }
    return (
        <>
            <SafeAreaView>
                <StatusBar
                    barStyle="light-content" // Use "light-content" for white text/icons
                    backgroundColor="#000"   // Set the status bar background color to black
                />
                <View style={{borderBottomEndRadius:150}} className="bg-slate-950 w-full h-max pt-10 pb-5 px-10 flex items-center justify-between flex-row">
                    <View className="py-5">
                        <Text className="text-white text-lg font-bold ml-1">Welcome Back!</Text>
                        <Text className="text-white text-5xl font-extrabold py-3">Sign In</Text>
                    </View>
                    {
                        loading && 
                        <View className="-mt-4 mr-10">
                            <LottieView 
                                source={{uri:"https://lottie.host/ec975ba1-6fc3-44f1-acac-91938720a2d5/PF93s0yFj0.json"}}
                                autoPlay
                                loop
                                speed={3}
                                style={{height:100,width:100}}
                            />
                        </View>
                    }
                </View>
                <View className="flex items-center justify-center w-screen">
                    <View className="flex items-center justify-center w-full pt-10 pb-5">
                    <View className="w-[80%]">
                            <Text className="text-xl font-bold text-slate-900 py-2">Username</Text>
                            <View className="h-14 px-5 py-1 bg-slate-200 rounded-full text-slate-950 flex flex-row items-center justify-start">
                                <View><FontAwesomeIcon icon={faUser}/></View>
                                <TextInput
                                    keyboardAppearance="default"
                                    value={user.name}
                                    className="text-lg text-slate-950 pl-3" 
                                    placeholder="Enter your username"
                                    onChangeText={(text) =>{setUser({...user,name:text})}}
                                />
                            </View>
                        </View>
                        <View className="w-[80%]">
                            <Text className="text-xl font-bold text-slate-900 py-2">Password</Text>
                            <View className="h-14 px-5 py-1 bg-slate-200 rounded-full text-slate-950 flex flex-row items-center justify-start">
                                <View><FontAwesomeIcon icon={faUnlock}/></View>
                                <TextInput
                                    keyboardAppearance="default"
                                    value={user.password}
                                    secureTextEntry={true}
                                    className="text-lg text-slate-950 pl-3" 
                                    placeholder="Enter your password"
                                    onChangeText={(text) =>{setUser({...user,password:text})}}
                                />
                            </View>
                        </View>
                        {/* <TouchableWithoutFeedback onPress={()=>{console.log("pressed")}}>
                            <View className="w-[80%]">
                                <Text className="text-right pt-2 mr-5">Forgot Password</Text>
                            </View>
                        </TouchableWithoutFeedback> */}
                    </View>
                    <TouchableOpacity className="w-[80%] mt-2" onPress={handleSignin}>
                        <View 
                            className="bg-slate-900 w-full h-max px-5 py-3"
                            style={{
                                borderTopEndRadius:40,
                                borderBottomStartRadius:40,
                                borderBottomEndRadius:10,
                                borderTopLeftRadius:10
                            }}
                        >
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
        </>
    );
}

export default function Signin(){
    return(
        <SigninContext />
    )
}