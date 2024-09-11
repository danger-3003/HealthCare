import { Text, View } from "react-native";
import { useUserContext } from "../../../Context/User/UserContext";

const ProfileContext = () => {
    const {value} = useUserContext();
    return (
            <View>
                <View className="m-5">
                    <Text className="text-3xl font-bold w-screen">{value} <Text className="text-gray-500">(You)</Text></Text>
                    <View className="flex flex-row">
                        <Text className="text-lg">30/03/2003</Text>
                        <Text className="ml-10 text-lg"><Text className="font-medium">age:</Text>{" "} 21</Text>
                    </View>
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
