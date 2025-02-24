import { useState, useEffect, ReactNode } from 'react'
import { Animated } from 'react-native'
import { ModalContainer } from './styles'
interface ModalProps {
    visible: boolean
    children: ReactNode
}

export default function StoryModalContainer({ visible, children }: ModalProps) {

    const [animationOpacity] = useState(new Animated.Value(0))

    useEffect(() => {
        const fadeIn = Animated.timing(animationOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        })

        const fadeOut = Animated.timing(animationOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        })

        if (visible) {
            fadeIn.start()
        } else {
            fadeOut.start()
        }

        return () => {
            fadeIn.stop()
            fadeOut.stop()
        }

    }, [visible, animationOpacity])


    return (
        <>
            {visible && (
                <ModalContainer>
                    {children}
                </ModalContainer>
            )}
        </>
    )
}