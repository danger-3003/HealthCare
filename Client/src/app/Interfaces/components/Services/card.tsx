import { View, Text } from "react-native";

const cards = (props:any) => {
    return (
        <View>
            <View className={`bg-green-400 h-16 w-16 mx-2 flex items-center justify-center rounded-3xl`}>
                <Text className="">BP</Text>
            </View>
        </View>
    );
};

export default cards;