import styled from "styled-components/native";

import { fontStyle, theme } from "../../../Theme/theme"

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
    margin-bottom: 10px;
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
    min-height:40%;
    width:100%;
    align-self: center;

    padding:12px ${(props: { marginLeftRight: string }) => props.marginLeftRight ? (props.marginLeftRight) : ('8%')} 15px;
`

export const BottomContainerProfile = styled.View`
    background-color:#fff;
    border-top-left-radius:25px;
    border-top-right-radius:25px;
    min-height:20%;
    width:100%;
    align-self: center;

    padding:12px ${(props: { marginLeftRight: string }) => props.marginLeftRight ? (props.marginLeftRight) : ('8%')} 15px;
`

export const BottomElements = styled.View`
    gap:12px;
`

export const TitleModal = styled.Text`
    font-size:16px;
    text-align:center;
    padding:0 0 10px;
    font-family: ${fontStyle.regular};
    color:${theme.textDark};
`

export const CentralContainer = styled.View`
    align-items: center;
`
export const RowContainer = styled.View`
    flex-direction: row;
`

export const BottonViewProfile = styled.TouchableOpacity`
    width: 97px;
    border-radius: 50px;
    align-items: center;
    margin-right: 20px;
`

export const BottomAddProfile = styled.TouchableOpacity`
    height: 97px;
    width: 97px;
    border-radius: 50px;
    align-items: center;
`