import { View } from "react-native";
import { BoldText, Dot, LeftContainer, LightText, MusicCardContainer, MusicImage, TextLine } from "./style";
import Icon from "react-native-vector-icons/Ionicons"
import { TouchableOpacity } from "react-native-gesture-handler";
import { SetStateAction } from "react";


interface MusicCardProps {
    musicName: string
    artist: string
    onPressFunction: React.Dispatch<SetStateAction<{ musicName: string; artist: string; }>>
}

export default function MusicCard(props: MusicCardProps) {

    return (
        <MusicCardContainer onPress={() => {
            props.onPressFunction({ musicName: props.musicName, artist: props.artist })
        }}>
            <LeftContainer>
                <MusicImage source={{ uri: "https://img.freepik.com/psd-gratuitas/modelo-de-folheto-quadrado-para-negocios-maximalistas_23-2148524497.jpg?w=740&t=st=1685136981~exp=1685137581~hmac=2bea99b61431edd9307625d1288e9bb80fab55b32c7b2c22def7ca962985ef37" }} />
                <View>
                    <BoldText>{props.musicName}</BoldText>
                    <TextLine>
                        <LightText>{props.artist}</LightText>
                        <Dot />
                        <LightText>3:58</LightText>
                    </TextLine>
                </View>
            </LeftContainer>
            <TouchableOpacity>
                <Icon
                    name="play-circle-outline"
                    size={20}
                    color={"#5D5D5D"}
                />
            </TouchableOpacity>
        </MusicCardContainer>
    )
}