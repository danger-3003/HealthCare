import { View, Text } from "react-native";
import React from "react";
import DashboardCard from "./card";

const Dashboard = () => {
    return (
        <View className="w-full">
            <DashboardCard />
            <DashboardCard />
            <DashboardCard />
        </View>
    );
};

export default Dashboard;
