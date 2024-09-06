import { View, Text, SafeAreaView, StatusBar} from "react-native";
import { Link } from "expo-router";

function Index(){
    return (
        <SafeAreaView className="flex-1 bg-slate-950">
            <StatusBar
                barStyle="light-content" // Use "light-content" for white text/icons
                backgroundColor="#000"   // Set the status bar background color to black
            />
            <View className="h-screen w-screen flex items-center justify-center">
                <View>
                    <Text className="text-white text-5xl sm:text-6xl text-center font-extrabold pt-5">HEALTH CARE</Text>
                    <Text className="text-white text-center text-sm sm:text-base font-bold pb-10">Monitor your HEALTH, Master your LIFE</Text>
                </View>
                <View className="bg-white px-5 sm:px-8 py-2 sm:py-3 rounded-lg">
                    <Link href={"/components/Authentication/Signin"} className="text-slate-950 text-2xl sm:text-3xl font-bold sm:font-extrabold">Getting Started</Link>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Index;