import { SafeAreaView, StatusBar, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import { Link, router } from "expo-router";
import {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faUnlock } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

function SigninContext() {

    const [user,setUser] = useState({name:"Sumanth Narem",password:"123456789"});
    const [noUser, setNoUser] = useState(false);
    const [signIn, setSignIn] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const handleSignin =()=>{
        user.name = user.name.trim();
        if (user.name.trim() === "" || user.password.trim() === "") {
            alert("Please fill all the fields");
            return;
        }
        axios.get(`http://192.168.1.10:3030/getUser/${user.name}?password=${encodeURIComponent(user.password)}`)
        .then((response)=>{
            if(response.data == 'No User Found')
            {
                setNoUser(true);
                setTimeout(()=>{
                    setNoUser(false);
                    router.push({
                        pathname:"../Signup/",
                    })
                },2000);
                // setUser({...user,name:"",password:""});
            }
            else if(response.data)
            {
                setSignIn(true);
                setTimeout(()=>{
                    setSignIn(false);
                    router.push({
                        pathname:"../../(tabs)/",
                        params:{userID:user.name}
                    }); 
                // setUser({...user,name:"",password:""});
                },1000);
            }
            else
            {
                setInvalid(true);
                setTimeout(()=>{
                    setInvalid(false);
                },2000);
            }
        })
        .catch((error)=>{console.log(error)});
    }
    return (
        <SafeAreaView>
            <StatusBar
                barStyle="light-content" // Use "light-content" for white text/icons
                backgroundColor="#000"   // Set the status bar background color to black
            />
            <View style={{borderBottomEndRadius:150}} className="bg-slate-950 w-full h-max pt-10 pb-5 px-10">
                <View className="py-5">
                    <Text className="text-white text-lg font-bold ml-1">Welcome Back!</Text>
                    <Text className="text-white text-5xl font-extrabold py-3">Sign In</Text>
                </View>
            </View>
            <View className="flex items-center justify-center w-screen">
                {
                    noUser && 
                    <View className="flex items-center justify-center">
                        <View className="bg-red-400 px-5 py-3 h-max w-[80%] rounded-md absolute -top-7">
                            <Text className="text-white font-bold text-lg text-center">User Not Found, Please SignUp !!!</Text>
                        </View>
                    </View>
                }
                {
                    invalid && 
                    <View className="flex items-center justify-center">
                        <View className="bg-red-400 px-5 py-3 h-max w-[80%] rounded-md absolute -top-7">
                            <Text className="text-white font-bold text-lg text-center">Wrong Passwowrd !!!</Text>
                        </View>
                    </View>
                }
                {
                    signIn && 
                    <View className="flex items-center justify-center">
                        <View className="bg-green-400 px-5 py-3 h-max w-[80%] rounded-md absolute -top-7">
                            <Text className="text-white font-bold text-lg text-center">SignIn Successfull.</Text>
                        </View>
                    </View>
                }
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
                        <Text className="text-xl font-bold text-slate-900 py-2">Username</Text>
                        <View className="h-14 px-5 py-1 bg-slate-200 rounded-full text-slate-950 flex flex-row items-center justify-start">
                            <View><FontAwesomeIcon icon={faUnlock}/></View>
                            <TextInput
                                keyboardAppearance="default"
                                value={user.password}
                                secureTextEntry={true}
                                className="text-lg text-slate-950 pl-3" 
                                placeholder="Enter your username"
                                onChangeText={(text) =>{setUser({...user,password:text})}}
                            />
                        </View>
                    </View>
                    <TouchableWithoutFeedback onPress={()=>{console.log("pressed")}}>
                        <View className="w-[80%]">
                            <Text className="text-right pt-2 mr-5">Forgot Password</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <TouchableOpacity className="w-[80%]" onPress={handleSignin}>
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

export default function Signin(){
    return(
        <SigninContext />
    )
}