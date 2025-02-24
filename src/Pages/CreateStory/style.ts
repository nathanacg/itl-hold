import styled from "styled-components/native";

import { theme, fontStyle } from "../../Theme/theme"

interface LinkStyle {
    background: string
    color: string
}

export const CreateStoryContainer = styled.View`
    width: 100%;
    height: 100%;
    justify-content: space-between;
    position: absolute;
    /* background-color: #000E;  */
    top: 10px;
    left: 0px;
`

export const StoryImage = styled.Image`
   width: 100%;
    height: 100%;
`

export const TopOptions = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    
   justify-content: space-between;
    padding: 10px 28px;
    background-color: ${(props: { bgColor: string }) => props.bgColor ? props.bgColor : "transparent"};
    
`

export const TopOptionsEdit = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    
   justify-content: space-between;
    padding: 90px 28px;
    background-color: ${(props: { bgColor: string }) => props.bgColor ? props.bgColor : "transparent"};
    
`

export const BackImage = styled.Image`
    width: 10px;
`;

export const RowDirection = styled.View`
    flex-direction: row;
    align-items: center;
`
export const RowDirectionMarcation = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: #000001;
`

export const OptionIcons = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-left: 20px;
    gap: 10px;
`

export const IconCircle = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 34px;
    height: 34px;
    border-radius: 17px;
    background-color: #0001;
`


export const LetterIcon = styled.Text`
    font-family: ${fontStyle.Bold};
    font-size: 16px;
    color: ${theme.secondaryColor};
`

export const BottomOptions = styled.View`
    width: 100%;
    display: flex;
    gap: 10px;
    flex-direction: column;
    background-color: transparent;
    justify-content: space-around;
    align-items: center;
    padding: 30px 5px;
`

export const Button = styled.TouchableOpacity`
    flex-direction: row;
    width: 90%;
    align-items: center;
    justify-content: center;
    gap: 10px;
    
    background-color: ${(props: { outline: boolean }) => props.outline ? (theme.primarycolor) : (theme.secondaryColor)};
  
    border-radius: 10px;
    padding: 10px 100px;
`

export const ButtonText = styled.Text`
    font-family: ${fontStyle.medium};
    font-size: 14px;
    color: ${(props: { outline: boolean }) => props.outline ? (theme.primarycolor) : (theme.secondaryColor)};
`

export const StoryOption = styled.TouchableOpacity`
    width: 100%;
    flex-direction: row;
    align-items: center;
    gap: 13px;
`

export const StoryOption2 = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const WhiteText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 16px;
    color: ${theme.secondaryColor};
`


export const Linkcontainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    gap: 6px;
    padding: 3px 12px;
    background-color:${(props: LinkStyle) => props.background ? props.background : theme.secondaryColor};
    border-radius: 11px;
`

export const LinkText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 13px;
    color: ${(props: LinkStyle) => props.color ? props.color : theme.primarycolor};
`

export const BlueText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 17px;
    color: ${theme.primarycolor};
`

export const WhiteTextMarcation = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 17px;
    color: ${theme.secondaryColor};
`

export const AddLinkInput = styled.TextInput`
    flex: 1;
    margin-left: 20px;
    border-bottom-width: .3px;
    border-bottom-color: ${theme.textDark};
    padding-bottom: 2px;
    margin-top: 7px;
    color: ${theme.textDark};
`

export const DeleteButton = styled.View`
    position: absolute;
    justify-content: center;
    align-items: center;
    bottom: 100px;
    align-self: center;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: #fff4;
`

export const LoadingText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 12px;
    padding: 3px 5px;
    background-color: #fff4;
    color: #Fff;
    position: absolute;
    bottom: 25%;
    align-self: center;
    border-radius: 6px;
`

export const TextModal = styled.Text`
    font-family: ${fontStyle.regular};
    color: ${theme.textDark};
    font-size: 14px;
`

export const TextModalOption = styled.Text`
    font-family: ${fontStyle.regular};
    color: ${theme.textDark};
    font-size: 13px;
`