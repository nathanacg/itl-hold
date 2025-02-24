import styled from 'styled-components/native';
import { fontStyle, theme } from '../../Theme/theme';
import { typeTheme } from '../../Config/enumTheme';

interface typeButton {
    optionButton: string
}

export const ContainerProfilesList = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border: 0.5px;
    border-color: ${theme.lightGray};
    border-top-color: transparent;
    border-left-color: transparent;
    border-right-color: transparent;
    padding:3% 7%;
`

export const GroupedProfileDatail = styled.View`
    flex-direction: row;
    gap: 10px;
`

export const ImageProfile = styled.Image`
    width: 44px;
    height: 44px;
    border-radius: 50px;
`

export const Name = styled.Text`
   font-size:13px;
   color: ${theme.textDark};
   font-family: ${fontStyle.regular};
`

export const GroupName = styled.Text`
    font-size:13px;
   color: ${theme.textDark};
   font-family: ${fontStyle.semiBold};
`

export const CheckBox = styled.View`
    border-radius:10px;
    border-width:1px;
    height: 15px;
    width: 15px;
    padding: 2%;
    border-color:${theme.primarycolor};
`

export const ButtonContent = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    padding: 4px;
    min-width: 20%;
    border-radius: 6px;
    border: 1px;
    border-color: ${theme.primarycolor};
    background-color : ${(props: typeButton) => props.optionButton === typeTheme.default ? (theme.primarycolor) : (theme.secondaryColor)};
`

export const TextButton = styled.Text`
    text-align: center;
    font-size:13.24px;
    font-family: ${fontStyle.regular};
    color: ${(props: typeButton) => props.optionButton === typeTheme.default ? (theme.secondaryColor) : (theme.primarycolor)};
`