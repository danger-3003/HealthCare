import { View, Text, Image } from "react-native";

const AboutCard = (props:any) => {
    return (
        <View className={`bg-blue-100 h-56 w-[90vw] mx-[5vw] mb-[5vw] rounded-3xl shadow-lg shadow-slate-500 overflow-hidden relative block`} style={{backgroundColor:props.layer1}} >
            <View className={`bg-violet-300 h-52 w-[65%] rounded-full absolute -left-28 top-2 z-[2] shadow-lg shadow-slate-700`} style={{backgroundColor:props.layer2}} ></View>
            <View className={`bg-violet-200 h-52 w-[55%] rounded-full absolute -left-28 top-2 z-[3] shadow-md shadow-slate-700`} style={{backgroundColor:props.layer3}} ></View>
            <View  className="fixed w-full h-full z-[4] p-5 flex items-center justify-center flex-row">
                <View className="w-[65%]">
                    <Text className={`font-extrabold mb-2`} style={{fontSize:25,color:props.fontcolor}}>{props.heading}</Text>
                    <Text className="font-medium" style={{fontSize:15,color:props.fontcolor}}>{props.content}</Text>
                </View>
                <View className="w-[35%] scale-125 ">
                    <Image source={props.image} className="w-[72%] h-[70%] ml-5"/>
                </View>
            </View>
        </View>
    );
};

export default AboutCard;