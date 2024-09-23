import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Octicons from '@expo/vector-icons/Octicons';
import Entypo from '@expo/vector-icons/Entypo';

const TabBar = ({ state, descriptors, navigation }:any) => {
    const primary="#0f172a";
    const active="red";

    const icons={
        index:(props:any)=><Entypo name="home" size={26} color={primary} {...props} />,
        'New_Record/index':(props:any)=><FontAwesome name="plus-circle" size={28} color={primary} {...props} />,
        'History/index':(props:any)=><FontAwesome5 name="history" size={24} color={primary} {...props} />,
        'Profile/index':(props:any)=><Octicons name="feed-person" size={24} color={primary} {...props} />
    }

    return (
        <View className="bg-white flex items-center justify-around flex-row absolute bottom-3 rounded-full mx-5 py-2 px-5 shadow-sm shadow-slate-800">
            {state.routes.map((route:any, index:any) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                if (['TabBar'].includes(route.name)) return null;
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        className="flex-1 items-center justify-end h-12 relative"
                    >
                        <View className={`${isFocused?`scale-125 -top-5 shadow-md shadow-slate-600`:'bg-none -top-1'} h-10 w-10 rounded-full absolute flex items-center justify-center`} style={{backgroundColor:isFocused?primary:"transparent"}}>
                            {
                                icons[route.name]({
                                    color: isFocused? "#fff": primary
                                })
                            }
                        </View>
                        <Text className="mt-1" style={{ color: isFocused ? active : primary }}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default TabBar;
