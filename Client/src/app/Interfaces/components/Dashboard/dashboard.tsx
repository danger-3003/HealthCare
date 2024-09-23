import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { CartesianChart, CartesianChartProvider, Bar } from "victory-native";

const DashboardCard = (props:any) => {
    const [data,setData]:any=useState([]);
    useEffect(()=>{
        setData(props.data);
    });
    let sys:any = [];
    let dys:any = [];
    let view:any = [];
    let sugar:any = [];
    let pulse:any = [];
    let Bp:any = [];
    data.map((item:any)=>{
        Bp=item.bp.split("/");
        sys.push(Bp[0]);
        dys.push(Bp[1]);
        view.push(item.view);
        sugar.push(item.sugar);
        pulse.push(item.pulse);
    })

    const barData = [
        { x: 'Jan', y: 30 },
        { x: 'Feb', y: 50 },
        { x: 'Mar', y: 75 },
        { x: 'Apr', y: 100 },
        { x: 'May', y: 60 },
      ];

      const BarData = sugar.map((item, index) => ({
        x: view[index], // x should be assigned first
        y: item
    }));

    return (
        <View className="flex items-center justify-center bg-slate-200 w-full h-56 my-3 rounded-3xl shadow-lg shadow-zinc-300">
            <Text>Victory Bar Chart</Text>
            <View className="h-20 w-20">
                <CartesianChartProvider>
                    <Bar
                        data={BarData}
                        x="x"
                        y="y"
                        style={{
                            data: { fill: "red", strokeWidth: 1, stroke: "black" },
                        }}
                        cornerRadius={{ topLeft: 10, topRight: 10 }}
                    />
                </CartesianChartProvider>
            </View>
        </View>
    );
};

export default DashboardCard;
