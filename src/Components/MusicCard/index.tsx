import { View } from "react-native";
import { BoldText, Dot, LeftContainer, LightText, MusicCardContainer, MusicImage, TextLine } from "./style";
import Icon from "react-native-vector-icons/Ionicons"
import { TouchableOpacity } from "react-native-gesture-handler";
import { SetStateAction } from "react";


interface MusicCardProps {
    musicName: string
    artist: string
    onPressFunction: React.Dispatch<SetStateAction<{ musicName: string; artist: string; }>>
    musicImage: string
    musicTime: string
}

export default function MusicCard(props: MusicCardProps) {

    return (
        <MusicCardContainer onPress={() => {
            props.onPressFunction({ musicName: props.musicName, artist: props.artist })
        }}>
            <LeftContainer>
                <MusicImage source={{ uri: props.musicImage }} />
                <View>
                    <BoldText>{props.musicName}</BoldText>
                    <TextLine>
                        <LightText>{props.artist}</LightText>
                        <Dot />
                        <LightText>{props.musicTime}</LightText>
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