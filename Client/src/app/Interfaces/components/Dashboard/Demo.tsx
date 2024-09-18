import { View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

// ...
const Demo = ()=>{
    const data=[ {value:50}, {value:80}, {value:90}, {value:70} ];
    const barColor = (index: number) => {
        if (index === 0) return "#007bff";
        else if (index === 1) return "#ff69b4";
        else return "#33cc33";
      };
    return(
        <>
            <View>
                <BarChart data = {data} horizontal={false} barWidth={20} barBorderColor={"#ccc"}  />
            </View>
        </>
    )
}

export default Demo;