import styled from "styled-components/native";

import { fontStyle, theme } from '../../../../Theme/theme';

export const Container = styled.ImageBackground`
    position: relative;
    width: 300px;
    height: 236px;
    border-radius: 12px;
    margin-right: 15px;
`

export const SalaImage = styled.Image`
    width: 100%;
    height: 100%;
    resize: contain;
`

export const Button = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 12px;
    right: 12px;
    padding: 5px 20px;
    
    background-color: ${theme.primarycolor};
    border-radius: 20px;
`
export const BottomText = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 12px;
    line-height: 21px;
    color: ${theme.secondaryColor};
`

export const Infos = styled.View`
    position: absolute;
    bottom: 10px;
    left: 12px;
`

export const SalaName = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 16px;
    font-weight: 600;
    color: ${theme.secondaryColor};
    line-height: 24px;
`

export const Description = styled.Text`
    width: 210px;
    font-size: 12px;
    font-weight: 400;
    color: ${theme.textligthGray};
`

export const Participants = styled.View`
    margin-top: 8px;
    margin-left: 15px;
    flex-direction: row;
    align-items: center;
`

export const ParticipantsImage = styled.View`
    background-color:${theme.secondaryColor};
    margin-left: -12px;
    width: 26px;
    height: 26px;
    border-radius: 26px;
`

export const ParticipantsCount = styled.Text`
    font-family: ${fontStyle.regular};
    margin-left: 10px;
    color: ${theme.secondaryColor};
    font-size: 10px;
`

export const UserImage = styled.Image`
    width: 26px;
    height: 26px;
    border-radius: 26px;
    overflow: hidden;
`

