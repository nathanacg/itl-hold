import styled from 'styled-components/native'

import { theme, fontStyle } from '../../Theme/theme'

export const MessageCardContainer = styled.TouchableOpacity`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px 24px;
`

export const UserImageContainer = styled.View`
    width: 50px;
    height: 50px;
    align-items: center;
    justify-content: center;
`



export const OnIcon = styled.View`
    position: absolute;
    top: 2px;
    left: 2px;
    width: 9.4px;
    height: 9.4px;
    background-color: ${theme.green};
    border: 1px;
    border-color: ${theme.secondaryColor};
    border-radius: 5px;
`

export const CenterContainer = styled.View`
    width: 50%;
`

export const BoldText = styled.Text`
    font-family: ${fontStyle.semiBold};
    color: ${theme.textDark};
    font-size: 14px;
`

export const NormalText = styled.Text`
    font-family: ${fontStyle.light};
    color: ${theme.textDark};
    font-size: 12px;
`

export const LastMessage = styled.Text`
    font-family: ${fontStyle.regular};
    color: ${theme.textDark};
    font-size: 13px;
`
export const MessageSended = styled.Text`
    font-family: ${fontStyle.semiBold};
    color: ${theme.darkBlue};
    font-size: 13px;
`

export const TimeContainer = styled.View`
    justify-content: center;
    align-items: center;
`

export const MessageTime = styled.Text`
     font-family: ${fontStyle.regular};
    color: ${theme.textDark};
    font-size: 11px;
`

export const NotificationsCount = styled.View`
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: ${theme.dangerColor};
`

export const NotificationsCountText = styled.Text`
    color: ${theme.secondaryColor};
`

export const TrashIcon = styled.Image`
    width: 15px;
`