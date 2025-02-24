import { Linking } from "react-native";

export const reOpenApp = async () => {
    console.log('opening https://');
    return Linking.openURL('https://');
};