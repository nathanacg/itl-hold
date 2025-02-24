import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { Container } from "./style";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";
import { panGetures } from "../../../Utils/handleGesture";

interface TagUserProps {
    userName: string
    parentRef: React.RefObject<T>
    tagUser: { name: string; address: string, positionX: number, positionY: number }
    setTagUsers: (tagUSer: { name: string, address: string, positionX: number, positionY: number }) => void
}

export default function TagUser(props: TagUserProps) {
    const tagUserRef = useRef(null);

    const [tagPrevPosition, setTagPrevPosition] = useState({ positionX: 0, positionY: 0 })

    const [tagUserinfo, setTagUserinfo] = useState<{ user: string, top: number, left: number }>({user: props.userName, top: 0, left: 0})

    const tagPositionX = useSharedValue(0)
    const tagPositionY = useSharedValue(0)

    const tagAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: tagPositionX.value }, { translateY: tagPositionY.value }]
    }))
    
    const hadleValues = () => {
        props.parentRef.current.measureInWindow((x: number, y: number, width: number, height: number) => {
            const percValueX = Math.floor((tagUserinfo?.left / width) * 100)
            const percValueY = Math.floor((tagUserinfo?.top / height) * 100)
            props.setTagUsers(props.tagUser, percValueX, percValueY)
        })
    }

    useEffect(() => {
        hadleValues()
    }, [tagUserinfo])


    return (
        <GestureDetector gesture={panGetures(tagPositionX, tagPositionY, tagPrevPosition, setTagPrevPosition, tagUserRef, setTagUserinfo, props.parentRef, 230, -20, 380, -10 )}>
             <Animated.View style={[{ flexDirection: "row" }, tagAnimatedStyle]} ref={tagUserRef}>
                <Container>
                    {props.userName} 
                </Container>
            </Animated.View>
        </GestureDetector>
       
    )
}