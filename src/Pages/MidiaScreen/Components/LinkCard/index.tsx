import { Image, View } from "react-native";
import { CardContainer, LeftContainer, SmallText, TextSimple, Title } from "./style";

import Entypo from "react-native-vector-icons/Entypo"
import { theme } from "../../../../Theme/theme";

interface LinkCardProps {
    title: string
    link: string
    date: string
    darken?: boolean
}

export default function LinkCard(props: LinkCardProps) {

    return (
        <CardContainer style={props.darken ? {backgroundColor: `${theme.lightGray}33`} : {backgroundColor: theme.secondaryColor}}>
            <LeftContainer>
                <Image source={require("../../../../Assets/Icons/world.png")} />
                <View>
                    <Title>{props.title}</Title>
                    <TextSimple>{props.link}</TextSimple>
                </View>
            </LeftContainer>
            <View>
                <SmallText>{props.date}</SmallText>
                <Entypo
                    name="chevron-small-right"
                    color={"#5D5D5D"}
                    size={20}
                    style={{ alignSelf: "flex-end" }}
                />
            </View>
        </CardContainer>
    )
}