import React from "react";
import { TouchableOpacity, Image, View } from "react-native"
import { Icon } from 'react-native-elements'
import {
    Container,
    CentralizeLogo,
    ActionHeaderContainer,
    Title
} from "./style";
import { useNavigation } from "@react-navigation/native"
import { StackRoutes } from "../../Routes/StackTypes";

import { theme } from "../../Theme/theme"



export default function Header() {
    const navigation = useNavigation<StackRoutes>();

    return (
        <Container>
            <CentralizeLogo>

                <Image style={{ marginLeft: 0, width: 240, resizeMode: 'contain' }} source={require("../../Assets/Image/logo-intellectus.png")} />

            </CentralizeLogo>


        </Container>
    )
}