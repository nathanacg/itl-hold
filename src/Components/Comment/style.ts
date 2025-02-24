import styled from "styled-components/native";

import { theme, fontStyle } from '../../Theme/theme'

export const Container = styled.TouchableWithoutFeedback`
   gap: 0px;
`

export const ContainerComent = styled.View`
    flex-direction: row;
    align-items: flex-start;
    padding: 12px 5px;
    padding-right: 12px;
`

export const ContainerActionComment = styled.View`
   padding-left: 15%;
`

export const UserImageContainer = styled.View`
    width: 15%;
`

export const UserImage = styled.Image`
    border-radius: 30px;
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

export const MainContainer = styled.View`
    width: 75%;
`

export const UserInfo = styled.View`
    flex-direction: row;
    gap: 7px;
`

export const UserName = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 14px;
    align-items: center;
    display: flex;
    color: ${theme.textDark};

`

export const CommentTime = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 12px;
    margin-left: 4px;
    color: ${theme.textligthGray};
`

export const Content = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    font-family: ${fontStyle.regular};
    color: ${theme.textDark};
    font-size: 13px;
`

export const CommentInfo = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 18px;
    margin-top: -10px;
    margin-left: 4px;
`

export const Likes = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 10px;
    color: ${theme.textligthGray};
`

export const Answers = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    gap:7px;
`

export const CommentImage = styled.Image`
    width: 16px;
    height: 16px;
`

export const AnswersText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 10px;
    color: ${theme.textligthGray};
`
export const LikeContainer = styled.TouchableOpacity`
    width: 10%;
`

export const ButtonImage = styled.Image`
    width: 20px;
    height: 20px;
`

export const SeeAnswers = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 10px;
    color: ${theme.textligthGray};
    margin-top: 8px;
    margin-left: 4px;
`
