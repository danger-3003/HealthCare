import { View, Text } from "react-native";

const services = (props:any) => {
    return (
        <View>
            <View className={`${props.bgcolor} h-16 w-16 mx-2 flex items-center justify-center rounded-3xl`}>
                <Text className="">BP</Text>
            </View>
        </View>
    );
};

export default services;
