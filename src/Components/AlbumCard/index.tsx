import React from 'react';
import { View } from "react-native"
import {
    Container,
    ImageBackground,
    Title,
    BottonContent
} from './style'
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackRoutes } from '../../Routes/StackTypes';

interface albunProps {
    title: string,
    image: string,
    onPress: () => void
}

export default function AlbumCard(props: albunProps) {
    return (
        <Container onPress={props.onPress}>
            <ImageBackground source={{ uri: props.image }} />
            <LinearGradient colors={['#f7f7f717', '#00000069', '#030a1e']} style={{ width: 172, height: 172, position: 'absolute', borderRadius: 10 }}>
                <BottonContent>
                    <Title>{props.title}</Title>
                </BottonContent>
            </LinearGradient>
        </Container>
    );
};
