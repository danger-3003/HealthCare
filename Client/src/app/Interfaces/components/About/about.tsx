import { View, Text, ScrollView } from "react-native";
import Card from "./card";
import Swiper from "react-native-swiper";
import PersonalizedHealth from "../../../../../assets/images/PersonalizedHealthProgress.jpg";
import BestExperience from "../../../../../assets/images/BestExperience.jpg";
import InitiatePersonal from "../../../../../assets/images/InitiateYourPersonal.jpg"

const About = () => {
    return (
        // <ScrollView
        //     horizontal={true}
        //     showsHorizontalScrollIndicator={false}
        //     className="w-screen"
        // >
            <Swiper loop autoplay autoplayDirection className="h-60">
                <Card layer1="#ccffff" layer2="#99ffff" layer3="#33ffff" fontcolor="#155e75" heading="Get the Best Experience Ever" content="Transform your health journey with expert-guided support." image={BestExperience}/>
                <Card layer1="#e8deff" layer2="#dfc6ff" layer3="#d5b4ff" fontcolor="#4c1d95" heading="Personalized Health Progress Insights" content="Track personalized progress and achieve better health outcomes." image={PersonalizedHealth}/>
                <Card layer1="#dedeff" layer2="#ccccff" layer3="#b0b0ff" fontcolor="#1e3a8a" heading="Initiate your personal health record today" content="Start building your health history for future wellness." image={InitiatePersonal}/>
            </Swiper>
        // {/* </ScrollView> */}
    );
};

export default About;

// black: {
//     100: "#ccffff",
//     200: "#99ffff",
//     300: "#66ffff",
//     400: "#33ffff",
//     500: "#00ffff",
//     600: "#00cccc",
//     700: "#009999",
//     800: "#006666",
//     900: "#003333"
// },
