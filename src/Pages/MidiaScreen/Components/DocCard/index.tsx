import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Circle, Container, Description, DocImage, DocName, Download, RightContainer, RowDirection, SmallText } from './styles';
import { theme } from '../../../../Theme/theme';

interface DocCard {
    title: string
    pages: string
    size: string
    type: string
    darken?: boolean
}


export default function DocCard(props: DocCard) {
    return (
        <Container style={props.darken ? { backgroundColor: `${theme.lightGray}33` } : { backgroundColor: theme.secondaryColor }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "flex-start" }}>
                <DocImage source={require("../../../../Assets/Icons/documento.png")} style={{ tintColor: theme.textDark }} />
                <View>
                    <DocName>{props.title}</DocName>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Description>{props.pages}</Description>
                        <Circle></Circle>
                        <Description>{props.size}</Description>
                        <Circle></Circle>
                        <Description>{props.type}</Description>
                    </View>
                </View>
            </View>
            <RightContainer>
                <SmallText>00/00/00</SmallText>
                <Download source={require("../../../../Assets/Icons/download.png")} style={{ tintColor: theme.lightGray }} />
            </RightContainer>
        </Container>
    )
}