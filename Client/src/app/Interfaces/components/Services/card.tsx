import { View, Text } from "react-native";

const cards = (props:any) => {
    return (
        <View>
            <View className={`${props.bg} h-28 w-28 mx-2 p-5 pb-3 flex items-center justify-center rounded-3xl relative shadow-md shadow-slate-600`}>
                <Text className="absolute text-slate-900 font-semibold left-2.5 top-2">Avg</Text>
                <Text className={`${props.color} font-bold mt-2`}>{props.text}</Text>
                <View className="absolute top-0 -right-0 p-2 bg-white rounded-3xl shadow-md shadow-slate-600">{props.icon}</View>
                <Text className={`text-lg font-bold ${props.headColor}`}>{props.heading}</Text>
            </View>
        </View>
    );
};

export default cards;