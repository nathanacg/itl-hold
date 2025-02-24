import styled from 'styled-components/native'

import { theme, fontStyle } from '../../../../Theme/theme'
import { typeTheme } from '../../../../Config/enumTheme'

interface typeButton {
    optionButton: string
}

export const StartToFollowContainer = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0px;
    margin-top: -6px;
`

export const LetfContainer = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 8px;
`

export const UserAddresss = styled.Text`
    font-family: ${fontStyle.medium};
    font-size: 13px;
    color: ${theme.textDark};
`

export const NotificationContent = styled.View`
    width: 60%;
    flex-direction: row;
`

export const NotificationTime = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 12px;
    color: ${theme.textligthGray} ;
`

export const ButtonContent = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    padding:2px 5px;
    width: 23%;
    border-radius: 6px;
    border-width: 1px;
    border-color: ${theme.primarycolor};
    background-color : ${(props: typeButton) => props.optionButton === typeTheme.default ? (theme.primarycolor) : (theme.secondaryColor)};
`

export const TextButton = styled.Text`
    text-align: center;
    margin-top: 2px;
    margin-bottom: 2px;
    font-size:13.24px;
    font-family: ${fontStyle.regular};
    color: ${(props: typeButton) => props.optionButton === typeTheme.default ? (theme.secondaryColor) : (theme.primarycolor)};
`