import React, { SetStateAction, useEffect } from 'react';
import { View } from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Modal from "react-native-modal";

import {
    Container,
    TextInfo,
    ContentInfo
} from './style'
import { theme } from '../../Theme/theme';

interface infoProps {
    text: string
    isVisible: boolean
    setVissible: React.Dispatch<SetStateAction<boolean>>
    serverError?: boolean
}

export default function Info(props: infoProps) {
    useEffect(() => {
        props.isVisible &&
            setTimeout(() => {
                props.setVissible(false)
            }, 4000)
    }, [props.isVisible])

    return (
        <Modal
            animationIn="slideInUp"
            animationOut="slideOutDown"
            isVisible={props.isVisible}
            style={{ flex: 1, justifyContent: "flex-end", marginBottom: props.serverError ? 100 : 20 }}
            backdropColor={theme.textDark}
            backdropOpacity={.3}
        >
            <Container>
                <ContentInfo>
                    <MaterialCommunityIcons
                        name='information-outline'
                        color={"#fff"}
                        size={13}
                    />
                    <TextInfo>
                        {props.text}
                    </TextInfo>
                    <View />
                </ContentInfo>
            </Container>
        </Modal>
    );
};
