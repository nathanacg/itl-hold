import styled from "styled-components/native";

import { theme, fontStyle } from "../../Theme/theme"

export const PostPreviewContainer = styled.View`
    width: 100%;
    height: 100%;
    background-color: ${theme.secondaryColor};
`

export const HeaderButton = styled.TouchableOpacity`
    justify-content: center;
    height: 35px;
    align-items: center;
    padding: 3px 23px;
    background-color: ${theme.primarycolor};
    border-radius: 8px;
`

export const ModalSave = styled.TouchableOpacity`
    background-color: #0245F4;
    margin-top: 10px;
    border-radius: 10px;
    width: 150px;
    height: 40px;
    align-items: center;
    justify-content: center;
`

export const ButtonText = styled.Text`
    font-family: ${fontStyle.semiBold};
    color: ${theme.secondaryColor};
    font-size: 14px;
    margin-top: 2px;
`

export const PreviewContent = styled.View`
    padding: 28px 18px;
`

export const TextRegularMedium = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 14px;
    color: ${theme.textDark};
`

export const PostLegendTextImage = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 14px;
    text-align: left;
    color: ${theme.textDark};
    z-index: 2;
`

export const PostLegendText = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 14px;
    text-align: center;
    padding: 20px;
    color: ${theme.textDark};
    z-index: 2;
    position: absolute;
`

export const PostLegendTextLegend = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 14px;
    text-align: center;
    padding: 20px;
    color: ${theme.textDark};
    z-index: 2;
    position: absolute;
`

export const PostLegendTextLink = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 14px;
    padding: 30px;
    text-align: center;
    color: ${theme.textDark};
    z-index: 2;
`

export const PostLegendTextLinkLegend = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 14px;
    text-align: left;
    padding-left: 15px;
    padding-bottom: 10px;
    font-weight: 400;
    color: ${theme.textDark};
    z-index: 2;
`

export const MarkedUserNameContainer = styled.View`
    position: absolute;
    left: 35px;
    top: -10px;
    align-items: center;
   
    flex-direction: row;
    background-color: #eeeeee;
    min-width: 40px;
    max-width: 150px;
    height: 21px;
    border-radius: 5px;
    padding: 2px 5px;
`

export const MarkedUserName = styled.Text`
    font-size: 12px;
    font-weight: bold;
    color: ${theme.textDark};
`
export const MarkedUserNameContainer2 = styled.View`
    position: absolute;
    left: 10px;
    top: 0px;
    align-items: center;
    flex-direction: row;
    background-color: #eeeeee;
    min-width: 40px;
    max-width: 150px;
    height: 21px;
    border-radius: 5px;
    padding: 2px 5px;
`

export const MarkedUserName2 = styled.Text`
    font-size: 12px;
    font-weight: bold;
    color: ${theme.textDark};
`


export const TextRegularSmall = styled.Text`
    font-family: ${fontStyle.regular};
    font-size: 12px;
    color: ${theme.textDark};
`

export const CardImageCreateAlbum = styled.TouchableOpacity`
   width: 82px;
   height: 82px;
   border-radius: 16px;
   justify-content: center;
   align-items: center;
   align-self: center;
   border-width:1px;
   margin-right: 5px;
   border-color: ${theme.primarycolor};
`

export const RowDirection = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`


export const PostContainer = styled.View`
    position: relative;
    width: 100%;
    border-radius: 6px;
    padding: 14px 4px 15px;
    margin-top: 8px;
    border-width: 1px;
    border-color: ${theme.lightGray};

`

export const UserInfo = styled.View`
    flex-direction: row;
    margin-left:20px;
    justify-content: space-between;
    align-items: center;
`

export const UserName = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-size: 14px;
    color: ${theme.textDark};
    flex: 1;
`

export const PostImage = styled.Image`
    align-self: center;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    margin: 10px 0; 
`
export const ModalImage = styled.Image`
    height: 400px;
    width: 250px;
    border-radius: 10px;
`

export const LikesMask = styled.View`
    width: 100%;
    height: 60px;
    position: absolute;
    bottom: 5px;
    left: 5px;
    background-color: #FFFFFF99;
    z-index: 1;
`

export const AvaliationConteiner = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 4px;
    margin-right: 5px;
    margin-bottom: 30px;
`
export const AvaliationText = styled.Text`
    font-family: ${fontStyle.semiBold};
    font-weight: 600;
    color: ${theme.lightGray};
`

export const MarkedUsers = styled.View`
    position: absolute;
    left: 10px;
    bottom: 20px;
    flex-direction: row;
    align-items: center;
    gap: 20px;
`