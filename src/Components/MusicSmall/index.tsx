import { View } from "react-native";
import { BoldText, Container, LightText, MusicContainer, MusicImage, TextContainer } from "./style";
import { theme } from "../../../../Theme/theme";
import { SetStateAction, useRef, useState } from "react";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { multipleGestures } from "../../../../Utils/handleGesture";

interface MusicsmallProps {
    selectedMusic: { musicName: string, artist: string, left: number, top: number, styleType: string, scale: number }
    setSelectedMusic: React.Dispatch<SetStateAction<{ musicName: string, artist: string, left: number, top: number, styleType: string, scale: number } | null>>
    handleMove: () => void
    deleteAllItem:  (item: React.RefObject<T>, setItem: React.Dispatch<SetStateAction<any>>) => void
}

export default function MusicSmall(props: MusicsmallProps) {
    const musicPositionX = useSharedValue(0)
    const musicPositionY = useSharedValue(0)
    const musicScale = useSharedValue(1)

    const musicSmallRef = useRef(null);

    const MusicAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: musicPositionX.value }, { translateY: musicPositionY.value }, { scale: musicScale.value }]
    }))

    const [prevMusicPosition, setPrevMusicPosition] = useState({ positionX: 0, positionY: 0 });

    const musiCardStyle = ["normal", "transparent", "dark"]
    const [musicStyle, setMusicStyle] = useState(0)

    const handleMusicStyle = () => {
        setMusicStyle(musicStyle < 2 ? musicStyle + 1 : 0)
        const newStyle = musiCardStyle[musicStyle]
        props.setSelectedMusic({ ...props.selectedMusic, styleType: newStyle })
    }

    const background = props.selectedMusic.styleType == "transparent" ? "#FFF4" : props.selectedMusic.styleType == "dark" ? "#000" : "#FFF"
    const color = props.selectedMusic.styleType == "transparent" ? "#fff" : props.selectedMusic.styleType == "dark" ? "#e5e5e5" : theme.textDark

    return (
        <GestureDetector
            gesture={multipleGestures(musicPositionX, musicPositionY, musicScale, prevMusicPosition, setPrevMusicPosition, musicSmallRef, props.setSelectedMusic, undefined, props.handleMove, props.deleteAllItem)}
        >
            <Animated.View
                ref={musicSmallRef}
                style={[MusicAnimatedStyle]}
            >
                <Container>
                    <MusicContainer onPress={handleMusicStyle} background={background}>
                        <MusicImage source={{ uri: "https://img.freepik.com/psd-gratuitas/modelo-de-folheto-quadrado-para-negocios-maximalistas_23-2148524497.jpg?w=740&t=st=1685136981~exp=1685137581~hmac=2bea99b61431edd9307625d1288e9bb80fab55b32c7b2c22def7ca962985ef37" }} />
                        <TextContainer>
                            <BoldText color={color}>{props.selectedMusic.musicName}</BoldText>
                            <LightText color={color}>{props.selectedMusic.artist}</LightText>
                        </TextContainer>
                    </MusicContainer>
                </Container>
            </Animated.View>
        </GestureDetector>

    )
}