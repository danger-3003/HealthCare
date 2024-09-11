import { View, Text, ScrollView } from "react-native";
import Card from "./card";

const About = () => {
    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className="w-screen">
            <Card layer1="#ffe1e1" layer2="#ffcccc" layer3="#ffa3a3" />
            <Card layer1="#dedeff" layer2="#ccccff" layer3="#b0b0ff" />
            <Card layer1="#e8deff" layer2="#dfc6ff" layer3="#d5b4ff" />
        </ScrollView>
    );
};

export default About;