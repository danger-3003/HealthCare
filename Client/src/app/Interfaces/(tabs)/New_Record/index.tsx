import {View, Text, TextInput} from "react-native";
import { useUserContext } from "../../../Context/User/UserContext";

const ComponentA = () => {
    const { value } = useUserContext();
    console.log(value);
    return (
        <View className="mt-20">
            <Text>Value: {value}</Text>
        </View>
    );
};

const App = () => {
    return (
        <ComponentA />
    );
};

export default App;
