import React from "react";
import { Tabs } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { UserProvider } from "../../Context/User/UserContext";

const TabsLayout = () => {
    return (
        <UserProvider>
            <Tabs>
                <Tabs.Screen name="index" options={{ tabBarLabel: "Home", headerShown:false, tabBarIcon:()=><AntDesign name="home" size={22} color="black" /> }} />
                <Tabs.Screen
                    name="New_Record/index"
                    options={{ tabBarLabel: "New Record", headerShown:false, tabBarIcon:()=><AntDesign name="pluscircleo" size={22} color="black" /> }}
                />
                <Tabs.Screen
                    name="History/index"
                    options={{ tabBarLabel: "History", headerTitle: "History", tabBarIcon:()=><MaterialIcons name="history" size={28} color="black" />}}
                />
                <Tabs.Screen
                    name="Profile/index"
                    options={{ tabBarLabel: "Profile", headerTitle: "Profile", tabBarIcon:()=><Ionicons name="person-circle-outline" size={28} color="black" /> }}
                />
            </Tabs>
        </UserProvider>
    );
};

export default TabsLayout;
