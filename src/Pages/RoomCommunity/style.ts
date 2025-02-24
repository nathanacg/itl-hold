import styled from "styled-components/native";

import { theme, fontStyle } from "../../Theme/theme"

export const RoomComunityContainer = styled.View`
    width: 100%;
    height: 100%;
`

export const Header = styled.ImageBackground`
    width: 100%;
    height: 270px;
`

export const Shadow = styled.View`
    width: 100%;
    height: 100%;
    background-color: #0009;
    padding: 19px 24px 14px;
    justify-content: space-between;
`

export const TextContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 10px;
`

export const BoldText = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 16px;
    color: ${theme.secondaryColor};
    line-height: 22px;
`

export const NormalText = styled.Text`
   font-family: ${fontStyle.regular};
    font-size: ${(props: { fontsize: string }) => props.fontsize ? props.fontsize : '12px'};
    color: ${theme.secondaryColor};
    line-height: 16px;
`

export const SmallText = styled.Text`
    width: 130px;
    font-family: ${fontStyle.regular};
    font-size: 11px;
    color: ${theme.secondaryColor};
`

export const RowDirection = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const ParticipantsContainer = styled.View`
    flex-direction: row;
    align-items: center;
    margin-left: 6px;
`

export const PublicContainer = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 5px;
    padding: 10px 20px;
`

export const FilterContainer = styled.View`
    border-bottom-width: 1px;
    border-bottom-color: ${theme.lightGray};
    padding-bottom: 24px;
`

export const DateText = styled.Text`
    font-family: ${(props: { fontFamily: string }) => props.fontFamily ? props.fontFamily : fontStyle.regular};
    font-size: 11px;
    color: ${theme.secondaryColor};
    line-height: ${(props: { lineHeight: string }) => props.lineHeight ? props.lineHeight : "15px"};
`

export const SalaButton = styled.TouchableOpacity`
    background-color: ${theme.primarycolor};
    border-radius: 26px;
    padding: 5px 15px 5px;
    justify-content: center;
    align-items: center;
    align-self: flex-end;
    margin-right: 5px;
`

export const SalaButton2 = styled.TouchableOpacity`
    background-color: ${theme.primarycolor};
    border-radius: 26px;
    padding: 5px 15px 5px;
    justify-content: center;
    align-items: center;
    align-self: center;
    margin-right: 5px;
    margin-top: 20px;
    margin-bottom: 50px;
`

export const ButtonText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 14px;
    color: ${(props: { color: string }) => props.color ? props.color : theme.secondaryColor};
`