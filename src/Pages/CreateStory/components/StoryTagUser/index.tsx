import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { Container } from "./style";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";
import { multipleGestures } from "../../../../Utils/handleGesture";
import { Dimensions } from "react-native";

interface StoryTagUserProps {
    user: {userName: string, top: number, left: number, scale: number}
    setTagUsers: React.Dispatch<SetStateAction<{userName: string, top: number, left: number, scale: number}[]>>
    handleDeleteOption:  React.Dispatch<SetStateAction<boolean>>
}

export default function StoryTagUser(props: StoryTagUserProps) {

    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;
    const tagUserRef = useRef(null);

    const [tagPrevPosition, setTagPrevPosition] = useState({ positionX: 0, positionY: 0 })

    const [tagUserinfo, setTagUserinfo] = useState<{ user: string, top: number, left: number, scale: number }>({user: props.user.userName, top: 0, left: 0, scale: 1})

    const tagPositionX = useSharedValue(0)
    const tagPositionY = useSharedValue(0)
    const tagScale = useSharedValue(1)

    const tagAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: tagPositionX.value }, { translateY: tagPositionY.value }, { scale: tagScale.value }]
    }))

    useEffect(() => {
        props.setTagUsers(prev => prev.map((user) => (
            user.userName == props.user.userName ? 
            {...props.user, top: tagUserinfo.top, left: tagUserinfo.left, scale: tagScale.value} : 
            user
        )))
    }, [tagUserinfo])

    const deleteUser = () => {
        props.setTagUsers(prev => prev.filter((user) => (
            user.userName != props.user.userName
        )))
    }

    const checkPosition = () => {
        tagUserRef.current && tagUserRef.current.measureInWindow((x: number, y: number) => {
            const onX = x > screenWidth/4 && x < screenWidth/2
            y >= screenHeight - 250 && onX && deleteUser()
        })
        props.handleDeleteOption(false)
    }

    const setDeleteMode = () => {
        props.handleDeleteOption(true)
    }
    
    return (
        <GestureDetector gesture={multipleGestures(tagPositionX, tagPositionY, tagScale, tagPrevPosition, setTagPrevPosition, tagUserRef, setTagUserinfo, null, setDeleteMode, checkPosition )}>
             <Animated.View style={[{ flexDirection: "row" }, tagAnimatedStyle]} ref={tagUserRef}>
                <Container>
                    @{props.user.userName} 
                </Container>
            </Animated.View>
        </GestureDetector>
    )
}