import { GestureDetector } from "react-native-gesture-handler";
import { multipleGestures } from "../../../../Utils/handleGesture";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { LinkText, Linkcontainer } from "./style";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SetStateAction, useRef, useState } from "react";
import { theme } from "../../../../Theme/theme";

interface LinkProps{
    handleMove: () => void
    deleteAllItem:  (item: React.RefObject<T>, setItem: React.Dispatch<SetStateAction<any>>) => void
    storyLink: { link: string, top: number, left: number, scale: number, type: string }
    setStoryLink: React.Dispatch<SetStateAction< { link: string, top: number, left: number, scale: number, type: string }>>
}

export default function Link(props: LinkProps){

    const [linkPrevPosition, setLinkPrevPosition] = useState({ positionX: 0, positionY: 0 })

    const handleLinkStyle = (CurrentType: string) => {
        CurrentType == 'normal' ?
            props.setStoryLink({ ...props.storyLink, type: 'transparent' }) :
            CurrentType == "transparent" ?
                props.setStoryLink({ ...props.storyLink, type: 'dark' }) :
                props.setStoryLink({ ...props.storyLink, type: 'normal' })
    }


    const linkRef = useRef(null);

    const linkPositionX = useSharedValue(0)
    const linkPositionY = useSharedValue(0)
    const linkScale = useSharedValue(1)

    const linkAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: linkPositionX.value }, { translateY: linkPositionY.value }, { scale: linkScale.value }]
    }))

    return(
        <GestureDetector
        gesture={multipleGestures(linkPositionX, linkPositionY, linkScale, linkPrevPosition, setLinkPrevPosition, linkRef, props.setStoryLink, undefined, props.handleMove, props.deleteAllItem)}
    >
        <Animated.View style={[{ flexDirection: "row" }, linkAnimatedStyle]} ref={linkRef}>
            <Linkcontainer
                background={props.storyLink.type == "transparent" ? "#ffffff3d" : theme.secondaryColor}
                onPress={() => handleLinkStyle(props.storyLink.type)}>
                <Ionicons
                    name='link'
                    size={20}
                    color={props.storyLink.type == "transparent" ? "#ffff" : theme.primarycolor}
                />
                <LinkText color={props.storyLink.type == "transparent" ? "#ffff" : props.storyLink.type == "dark" ? "#000" : theme.primarycolor}>
                    {props.storyLink.link}
                </LinkText>
            </Linkcontainer>
        </Animated.View>
    </GestureDetector>
    )
}