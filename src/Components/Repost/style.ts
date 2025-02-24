import styled from "styled-components/native";

import { fontStyle, theme } from '../../Theme/theme';

export const Container = styled.View`
    width: 100%;
    padding:  ${(props: { paddingTop: string }) => props.paddingTop ? (props.paddingTop) : ('25px')} 0px 0px;
`

export const PostHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 15px;
`

export const UserImage = styled.Image`
    width: 36px;
    height: 36px;
    border-radius: 18px;
`

export const UserName = styled.Text`
    font-family: ${fontStyle.Bold};
    font-size: 16px;
    line-height: 24px;
    color: ${theme.textDark};
`
export const PostTimeContainer = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 3px;
`

export const PostTime = styled.Text`
    font-size: 10px;
    font-weight: 400;
    line-height: 15px;
    color: ${theme.lightGray};
`

export const UserInfo = styled.View`
    flex-direction: row;
    gap: 12px;
`

export const AvaliationText = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-weight: 600;
    color: ${theme.lightGray};
`

export const PostLegend = styled.Text`
    font-family:${fontStyle.regular};
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
    color: ${theme.textDark};
    margin: 8px 0px 10px 17px;
`

export const PostLegendRepost = styled.Text`
    font-family:${fontStyle.regular};
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
    color: ${theme.textDark};
    padding: 10px;
`

export const AvaliationConteiner = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 10px;
    margin-top: 0px;
    margin-right: 20px;
    gap: 3px;
`

export const PostMenu = styled.TouchableOpacity`
    justify-self: flex-end;
`

export const PostFooter = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 19px;
`

export const Row = styled.View`
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
`

export const SocialActions = styled.View`
    flex-direction: row;
    gap: 19px;
`

export const Likes = styled.Text`
    font-family: ${fontStyle.medium};
    font-size: 14px;
    color: ${theme.textDark};
    font-weight: 400;
    margin-left: 17px;
    margin-top: -10px;
    margin-bottom: 10px;
`


export const MaskSpoiler = styled.View`
    width: 100%;
    backdrop-filter: blur(10px);
    height: 101%;
    position: absolute;
    z-index: 5;
    background-color:  rgba(0.137, 0.122, 0.125, 0.940);
    margin: 0px;
    justify-content: center;
    align-items: center;
`

export const MaskSpoiler2 = styled.View`
    width: 100%;
    backdrop-filter: blur(10px);
    height: 100%;
    position: absolute;
    z-index: 5;
    background-color:  rgba(0.137, 0.122, 0.125, 0.940);
    margin: 0px;
    justify-content: center;
    align-items: center;
`

export const IndexContainer = styled.View`
    background-color: #000000C2;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 12px;
    bottom: 9px;
    width: 38px;
    height: 20px;
    border-radius: 3px;
    
`
export const MarkedUserNameContainer = styled.View`
    margin-left: 7px;
    margin-bottom: 10px;
    align-items: center;
    flex-direction: row;
   
    min-width: 40px;
    max-width: 150px;
    height: 23px;
   
`

export const MarkedUserName = styled.Text`
    font-size: 13px;
    font-weight: bold;
    border-radius: 5px;
    padding: 2px 5px;
    background-color: #eeeeee;
    color: ${theme.textDark};
`

export const MarkText = styled.Text`
    width: 60%;
    font-family: ${fontStyle.regular};
    text-align: center;
    font-size: 14px;
    margin-top: 5%;
    color: ${theme.secondaryColor};
`

export const Bold = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 14px;
    color: ${theme.secondaryColor};

`

export const MaskButtonText = styled.Text`
    text-align: center;
    margin-bottom: 25%;
    font-size: 12px;
    font-family: ${fontStyle.regular};
    color: ${theme.secondaryColor};
    border: 1px;
    padding: 40px 15px;
`

export const OpenSpoilerButton = styled.TouchableOpacity`
    padding: 5px 10px;
    background-color: ${theme.secondaryColor};
    border-radius: 10px;
`

export const TimerPublicationContent = styled.View`
    align-self: flex-end;
    flex-direction: row;
    gap: 5px;
    align-items: center;
    margin: -5px 0;
`

export const TimerPublication = styled.Text`
   color: ${theme.textLight};
   font-size: 13px;
   font-family: ${fontStyle.regular};
`
export const AudioView = styled.View`
     width: 90%;
     margin-bottom: 10px;
     margin-left: 42px;
`