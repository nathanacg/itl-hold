import styled from "styled-components/native"
import LinearGradient from 'react-native-linear-gradient';
import { fontStyle, theme } from "../../Theme/theme";
import { Dimensions } from "react-native";

const Height = Dimensions.get('screen').height

export const Container = styled.ImageBackground`
    height: 160px;
`

export const Shadow = styled(LinearGradient).attrs({
    colors: ["#0009", "#0009", '#0009', '#0009'],
    start: { x: 0.5, y: 1 },
    end: { x: 0.5, y: 0 },
})`

  width: 100%;
  height: 100%;
  padding: 12px 18px;
  justify-content: space-between;
`

export const RowDirection = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const SalaHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
`

export const BoldText = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 12px;
    color: ${theme.secondaryColor};
`

export const NormalText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 12px;
    color: ${theme.secondaryColor};
`

export const UserImage = styled.Image`
    width: 32px;
    height: 32px;
    border-radius: 16px;
`

export const IconCircle = styled.View`
    width: 36px;
    height: 36px;
    border-radius: 16px;
    background-color: #D0E0F7;
    justify-content: center;
    align-items: center;
`

export const SalaTitle = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 15px;
    color: ${theme.secondaryColor};
`
export const SalaDesc = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 13px;
    color: ${theme.secondaryColor};
`

export const WhiteText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 11px;
    color: ${theme.secondaryColor};
`
export const WhiteTextRoom = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: ${Height <= 853 ? '11px' : '13px'};
    color: ${(props: { color: string }) => props.color ? props.color : theme.secondaryColor};
`

export const MoreText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 11px;
    color: ${theme.lightGray};
`

export const SalaFooter = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0;
`

export const Participants = styled.Image`
    width: 24px;
    height: 24px;
    border-radius: 12px;
    border-width: 1px;
    border-color: #000;
    margin-right: -8px;

`

export const SalaButton = styled.TouchableOpacity`
     /* background-color: ${theme.primarycolor}; */
    border-radius: 6px;
    padding: 2px 8px 0px;
    justify-content: center;
    align-items: center;
    align-self: flex-end;
    border: 1px;
    border-color: ${theme.primarycolor};
    background-color: ${(props: { disable: boolean }) => props.disable ? theme.secondaryColor : theme.primarycolor};
`
export const ButtonText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 13px;
    color: ${(props: { disable: boolean }) => props.disable ? theme.primarycolor : theme.secondaryColor};
`

export const UserType = styled.Text`
    max-width: 120px;
    align-self: flex-end;
    text-align: center;
    padding: 2px 6px 0px;
    font-family: ${fontStyle.regular};
    color: ${theme.secondaryColor};
    background-color: #0005;
    border-radius: 6px;
    margin-top: 4px;
    font-size: 12px;
    line-height: 15px;
`