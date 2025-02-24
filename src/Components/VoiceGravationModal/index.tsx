import React, { useEffect, useState } from 'react'
import { Modal, Text, View } from 'react-native'

import Animated, { useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated'

interface RecordingModalProps {
    isVisible: boolean
    recordingTime: number
}

const RecordingModal: React.FC<RecordingModalProps> = ({
    isVisible,
    recordingTime,
}) => {
    const width = useSharedValue(0)
    const [elapsedTime, setElapsedTime] = useState<number>(0)

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null

        if (isVisible) {
            interval = setInterval(() => {
                setElapsedTime((prevTime) => prevTime + 1)
            }, 1000)
        } else {
            clearInterval(interval!)
            setElapsedTime(0)
        }

        return () => {
            if (interval) {
                clearInterval(interval)
            }
        };
    }, [isVisible])


    useEffect(() => {
        if (isVisible) {
            width.value = withSpring(0, { damping: 10, stiffness: 100 });
        } else {
            width.value = withSpring(1, { damping: 10, stiffness: 100 });
        }
    }, [isVisible])

    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: `${100 * width.value}%`,
        }
    })

    const formattedTime = `${String(Math.floor(elapsedTime / 60)).padStart(
        2,
        "0"
    )}:${String(elapsedTime % 60).padStart(2, "0")}`

    return (
        <Modal visible={isVisible} transparent={true}>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <Animated.View
                    style={[
                        {
                            backgroundColor: "white",
                            justifyContent: "center",
                            borderRadius: 20,
                            alignItems: "center",
                            height: "6.5%",
                            position: "absolute",
                            right: 0,
                            marginRight: 10,
                            bottom: 12,
                        },
                        animatedStyle,
                    ]}
                >
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        GRAVANDO... {formattedTime}
                    </Text>
                </Animated.View>
            </View>
        </Modal>
    )
}

export default RecordingModal
