import React, { SetStateAction, useEffect, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image } from 'react-native';
import { GestureEvent, PanGestureHandler, PanGestureHandlerEventPayload, State } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


interface MusicsmallProps {
    secondaryMidia: { fileName: string; uri: string; top: any; left: any; scale: number };
    setSecondaryMidia: React.Dispatch<SetStateAction<{ fileName: string; uri: string; top: any; left: any; scale: number }>>;
    handleMove: () => void;
    deleteAllItem: (item: React.RefObject<T>, setItem: React.Dispatch<SetStateAction<any>>) => void;
    cancelMidia: () => void; // Função para cancelar a música
}

export default function TextMover(props: MusicsmallProps) {
    const [text, setText] = useState('');
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const initialX = screenWidth / 2;
    const initialY = screenHeight / 2;
    const [positionX, setPositionX] = useState(0);
    const [positionY, setPositionY] = useState(0);

    const handleMove = (event: GestureEvent<PanGestureHandlerEventPayload>) => {
        const { nativeEvent: { translationX, translationY } } = event;
        setPositionX(positionX + translationX);
        setPositionY(positionY + translationY);
    };

    const handleGestureStateChange = (event: GestureEvent<PanGestureHandlerEventPayload>) => {
        if (event.nativeEvent.state === State.END) {
            setPositionX(positionX + event.nativeEvent.translationX);
            setPositionY(positionY + event.nativeEvent.translationY);
            date();
        }
    };

    const date = () => {
        props.secondaryMidia.left = positionX.toFixed(0)
        props.secondaryMidia.top = positionY.toFixed(0)
    }

    useEffect(() => {
        setPositionX(screenWidth / 2.5);
        setPositionY(screenHeight / 2)
   }, [])

    return (
        <PanGestureHandler onGestureEvent={handleMove} onHandlerStateChange={handleGestureStateChange}>
            <View style={{
                flexDirection: 'row',
                left: positionX,
                top: positionY,
                height: 40,
                width: 40,
            }}>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                    }}
                    source={{ uri: props.secondaryMidia.uri }}
                />
                <TouchableOpacity onPress={props.cancelMidia}>
                    <MaterialIcons
                        name='cancel'
                        size={20}
                        color={'red'}
                        style={{ top: -30, left: -120 }}
                    /> 
                </TouchableOpacity>
            </View>
        </PanGestureHandler>
    );
}