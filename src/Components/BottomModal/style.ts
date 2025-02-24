import styled from "styled-components/native";

import { fontStyle, theme } from "../../Theme/theme"
import { Platform } from 'react-native';

export const TopSpaceContainer = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: center;
    margin-bottom: ${(props: { marginBottom: string }) => props.marginBottom};
`

export const TopSpace = styled.TouchableOpacity`
    width: 114px;
    height: 2.91px;
    border-radius: 2px;
    background-color: rgba(169, 169, 169, 0.2);
`

export const BackgroundModal = styled.KeyboardAvoidingView`
    flex: 1;
    justify-content: flex-end;
    background-color: #000000aa;
`

export const BottomContainer = styled.View`
    background-color:#fff;
    border-top-left-radius:25px;
    border-top-right-radius:25px;
    min-height: ${Platform.OS === 'android' ? '20%' : '15%'};
    width:100%;
    align-self: center;
    padding:12px ${(props: { marginLeftRight: string }) => props.marginLeftRight ? (props.marginLeftRight) : ('8%')} 30px;
`

export const BottomElements = styled.View`
    gap:12px;
`

export const TitleModal = styled.Text`
    font-size:16px;
    text-align:center;
    padding:0px 0px 10px;
    font-family: ${fontStyle.regular};
    color:${theme.textDark};
`