import { View, Text } from "react-native";

const services = (props) => {
    return (
        <View>
            <View className={`${props.bgcolor} h-20 w-20 mx-2 flex items-center justify-center rounded-3xl`}>
                <Text className="">BP</Text>
            </View>
        </View>
    );
};

export default services;
